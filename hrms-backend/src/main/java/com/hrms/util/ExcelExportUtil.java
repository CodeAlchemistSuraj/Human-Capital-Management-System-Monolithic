package com.hrms.util;

import com.hrms.model.Payroll;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelExportUtil {

    public static byte[] exportPayrollsToExcel(List<Payroll> payrolls) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Payroll Report");

        // Create header row
        Row headerRow = sheet.createRow(0);
        String[] columns = {"Employee ID", "Employee Name", "Payroll Date", "Basic Salary", "Allowances", "Deductions", "Net Salary", "PF Contribution", "ESI Contribution", "TDS"};
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(columns[i]);
            CellStyle style = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            style.setFont(font);
            cell.setCellStyle(style);
        }

        // Create data rows
        int rowNum = 1;
        for (Payroll payroll : payrolls) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(payroll.getEmployee().getEmployeeId());
            row.createCell(1).setCellValue(payroll.getEmployee().getFirstName() + " " + payroll.getEmployee().getLastName());
            row.createCell(2).setCellValue(payroll.getPayrollDate().toString());
            row.createCell(3).setCellValue(payroll.getBasicSalary().doubleValue());
            row.createCell(4).setCellValue(payroll.getAllowances() != null ? payroll.getAllowances().doubleValue() : 0.0);
            row.createCell(5).setCellValue(payroll.getDeductions() != null ? payroll.getDeductions().doubleValue() : 0.0);
            row.createCell(6).setCellValue(payroll.getNetSalary().doubleValue());
            row.createCell(7).setCellValue(payroll.getPfContribution() != null ? payroll.getPfContribution().doubleValue() : 0.0);
            row.createCell(8).setCellValue(payroll.getEsiContribution() != null ? payroll.getEsiContribution().doubleValue() : 0.0);
            row.createCell(9).setCellValue(payroll.getTds() != null ? payroll.getTds().doubleValue() : 0.0);
        }

        // Auto-size columns
        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        workbook.close();
        return baos.toByteArray();
    }
}