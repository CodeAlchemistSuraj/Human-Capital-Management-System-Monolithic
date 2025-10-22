package com.hrms.util;

import com.hrms.model.Payroll;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import org.springframework.stereotype.Component;
import com.itextpdf.html2pdf.HtmlConverter; // <--- ADD THIS IMPORT

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class PdfGeneratorUtil {

    // Changed to non-static
    public byte[] generatePayrollPayslip(Payroll payroll) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // Add title
        document.add(new Paragraph("Payslip")
                .setFontSize(20)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER));

        // Add payroll details
        Table table = new Table(2);
        table.addCell("Employee ID");
        table.addCell(payroll.getEmployee().getEmployeeId());
        table.addCell("Employee Name");
        table.addCell(payroll.getEmployee().getFirstName() + " " + payroll.getEmployee().getLastName());
        table.addCell("Payroll Date");
        table.addCell(payroll.getPayrollDate().toString());
        table.addCell("Basic Salary");
        table.addCell(payroll.getBasicSalary().toString());
        table.addCell("Allowances");
        table.addCell(payroll.getAllowances() != null ? payroll.getAllowances().toString() : "0.00");
        table.addCell("Deductions");
        table.addCell(payroll.getDeductions() != null ? payroll.getDeductions().toString() : "0.00");
        table.addCell("Net Salary");
        table.addCell(payroll.getNetSalary().toString());
        table.addCell("PF Contribution");
        table.addCell(payroll.getPfContribution() != null ? payroll.getPfContribution().toString() : "0.00");
        table.addCell("ESI Contribution");
        table.addCell(payroll.getEsiContribution() != null ? payroll.getEsiContribution().toString() : "0.00");
        table.addCell("TDS");
        table.addCell(payroll.getTds() != null ? payroll.getTds().toString() : "0.00");

        document.close();
        return baos.toByteArray();
    }

    // <--- ADD THIS NEW METHOD --->
    public byte[] generatePdfFromHtml(String htmlContent) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        HtmlConverter.convertToPdf(htmlContent, baos);
        return baos.toByteArray();
    }
}