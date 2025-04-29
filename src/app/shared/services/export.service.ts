import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import { ExpenseSummary, CalculationResults, TimeMetrics } from 'app/types';

@Injectable({
    providedIn: 'root',
})
export class ExportService {
    exportToPDF(expenseSummary: ExpenseSummary, calculationResults: CalculationResults & { timeMetrics?: TimeMetrics }): void {
        const doc = new jsPDF();
        let yPos = 20;

        // Title
        doc.setFontSize(16);
        doc.text('Expense and Rate Summary', 20, yPos);
        yPos += 30;

        // Expense Categories
        doc.setFontSize(14);
        doc.text('Expense Categories', 20, yPos);
        yPos += 10;

        // Category Details
        for (const category of expenseSummary.categories) {
            // Add page if needed
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            autoTable(doc, {
                head: [[category.name, 'Original Value', 'Rate', 'Yearly Amount', '% of Category']],
                body: category.items.map((item) => {
                    const percentage = ((item.amount / category.total) * 100).toFixed(1);
                    return [item.name, `€${item.originalValue?.toFixed(2) || '0.00'}`, item.rate || 'N/A', `€${item.amount.toFixed(2)}`, `${percentage}%`];
                }),
                startY: yPos,
            });

            yPos = (doc as any).lastAutoTable.finalY + 15;
        }

        // Add page for summary if needed
        if (yPos > 200) {
            doc.addPage();
            yPos = 20;
        }

        // Working Time Summary
        doc.setFontSize(14);
        doc.text('Working Time Summary', 20, yPos);
        yPos += 10;

        if (calculationResults.timeMetrics) {
            autoTable(doc, {
                head: [['Type', 'Amount']],
                body: [
                    ['Working Days per Year', `${calculationResults.timeMetrics.workingDays}`],
                    ['Total Days Off', `${calculationResults.timeMetrics.daysOff}`],
                    ['Working Hours per Day', `${calculationResults.timeMetrics.hoursPerDay}`],
                ],
                startY: yPos,
            });
        }

        yPos = (doc as any).lastAutoTable.finalY + 15;

        // Minimum Rates
        doc.setFontSize(14);
        doc.text('Minimum Rates', 20, yPos);
        yPos += 10;

        autoTable(doc, {
            head: [['Rate Type', 'Amount']],
            body: [
                ['Hourly Rate', `€${calculationResults.minHourlyRate.toFixed(2)}`],
                ['Daily Rate', `€${calculationResults.minDailyRate.toFixed(2)}`],
                ['Monthly Rate', `€${calculationResults.minMonthlyRate.toFixed(2)}`],
            ],
            startY: yPos,
        });

        yPos = (doc as any).lastAutoTable.finalY + 15;

        // Total Expenses
        doc.setFontSize(14);
        doc.text(`Total Annual Expenses: €${expenseSummary.totalExpenses.toFixed(2)}`, 20, yPos);

        doc.save('expense-summary.pdf');
    }

    async exportToExcel(expenseSummary: ExpenseSummary, calculatedRates: CalculationResults): Promise<void> {
        const workbook = XLSX.utils.book_new();

        // Create a worksheet for each category
        expenseSummary.categories.forEach((category, index) => {
            const categoryData = [
                [`${category.name} Details`],
                [],
                ['Item', 'Original Value', 'Rate', 'Yearly Amount', '% of Category'],
                ...category.items.map((item) => {
                    const percentage = ((item.amount / category.total) * 100).toFixed(1);
                    return [
                        item.name,
                        { t: 'n', v: item.originalValue || 0, z: '€#,##0.00' },
                        item.rate || 'N/A',
                        { t: 'n', v: item.amount, z: '€#,##0.00' },
                        `${percentage}%`,
                    ];
                }),
                [],
                [`${category.name} Total:`, '', '', { t: 'n', v: category.total, z: '€#,##0.00' }],
            ];

            const ws = XLSX.utils.aoa_to_sheet(categoryData);
            XLSX.utils.book_append_sheet(workbook, ws, category.name);

            // Set column widths
            const wscols = [
                { wch: 20 }, // Item
                { wch: 15 }, // Original Value
                { wch: 10 }, // Rate
                { wch: 15 }, // Yearly Amount
                { wch: 15 }, // Percentage
            ];
            ws['!cols'] = wscols;

            // Style the header
            ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];
        });

        // Create Working Time Summary worksheet
        const timeData = [
            ['Working Time Summary'],
            [],
            ['Metric', 'Value'],
            ['Working Days', expenseSummary.timeMetrics.workingDays],
            ['Days Off', expenseSummary.timeMetrics.daysOff],
            ['Hours per Day', expenseSummary.timeMetrics.hoursPerDay],
        ];
        const timeWs = XLSX.utils.aoa_to_sheet(timeData);
        XLSX.utils.book_append_sheet(workbook, timeWs, 'Working Time');

        // Set column widths for time worksheet
        timeWs['!cols'] = [
            { wch: 20 }, // Metric
            { wch: 15 }, // Value
        ];
        timeWs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];

        // Create Minimum Rates worksheet
        const ratesData = [
            ['Minimum Rates'],
            [],
            ['Rate Type', 'Amount'],
            ['Hourly Rate', { t: 'n', v: calculatedRates.minHourlyRate, z: '€#,##0.00' }],
            ['Daily Rate', { t: 'n', v: calculatedRates.minDailyRate, z: '€#,##0.00' }],
            ['Monthly Rate', { t: 'n', v: calculatedRates.minMonthlyRate, z: '€#,##0.00' }],
            [],
            ['Total Annual Expenses', { t: 'n', v: expenseSummary.totalExpenses, z: '€#,##0.00' }],
        ];
        const ratesWs = XLSX.utils.aoa_to_sheet(ratesData);
        XLSX.utils.book_append_sheet(workbook, ratesWs, 'Rates Summary');

        // Set column widths for rates worksheet
        ratesWs['!cols'] = [
            { wch: 20 }, // Rate Type
            { wch: 15 }, // Amount
        ];
        ratesWs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];

        XLSX.writeFile(workbook, 'expense-summary.xlsx');
    }
}
