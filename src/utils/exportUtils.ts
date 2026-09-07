import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Data mapping utility to flatten registration objects
const mapRegistrationsToData = (registrations: any[]) => {
  return registrations.map(reg => ({
    'Serial Pass ID': reg.passId || `Kizuna ${3000 + reg.id}`,
    'Full Name': reg.fullName,
    'Email': reg.email,
    'Phone': reg.phone,
    'Organization': reg.organization || 'N/A',
    'Role/Field': reg.roleOrField || 'N/A',
    'Status': reg.status
  }));
};

export const exportToCSV = (registrations: any[]) => {
  const data = mapRegistrationsToData(registrations);
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add Headers
  csvRows.push(headers.join(','));

  // Add Rows
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + (row as any)[header]).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Kizuna2026_Confirmed_List_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (registrations: any[]) => {
  const data = mapRegistrationsToData(registrations);
  if (data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Confirmed Attendees');

  XLSX.writeFile(workbook, `Kizuna2026_Confirmed_List_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportToPDF = async (registrations: any[]) => {
  const data = mapRegistrationsToData(registrations);
  if (data.length === 0) return;

  const doc = new jsPDF('landscape');

  // Load Japanese font
  try {
    const fontUrl = '/fonts/MPLUS1p-Regular.ttf';
    const fontResponse = await fetch(fontUrl);

    // Check if the server returned HTML (error page) instead of the font
    if (fontResponse.headers.get('content-type')?.includes('text/html')) {
      throw new Error('Fetched HTML instead of font file');
    }

    const fontBuffer = await fontResponse.arrayBuffer();

    // Convert ArrayBuffer to Base64
    let binary = '';
    const bytes = new Uint8Array(fontBuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Font = btoa(binary);

    doc.addFileToVFS('MPLUS1p-Regular.ttf', base64Font);
    doc.addFont('MPLUS1p-Regular.ttf', 'MPLUS1p', 'normal');
    doc.setFont('MPLUS1p', 'normal');
  } catch (error) {
    console.error('Failed to load Japanese font, fallback to default:', error);
    doc.setFont('helvetica', 'normal');
  }

  // Title
  doc.setFontSize(18);
  doc.text('Kizuna 2026 Okayama-Bangladesh Partnership Seminar', 14, 22);

  // Subtitle
  doc.setFontSize(12);
  doc.text(`Confirmed Attendees List - Generated on ${new Date().toLocaleDateString()}`, 14, 30);

  // Table
  const tableColumn = ["Pass ID", "Full Name", "Email", "Phone", "Organization", "Role"];
  const tableRows = data.map(item => [
    item['Serial Pass ID'],
    item['Full Name'],
    item['Email'],
    item['Phone'],
    item['Organization'],
    item['Role/Field']
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 35,
    theme: 'grid', // Standard grid, good for black and white
    headStyles: {
      fillColor: [0, 0, 0], // Black background for header
      textColor: [255, 255, 255], // White text for header
      fontStyle: 'bold'
    },
    styles: {
      font: 'MPLUS1p',
      fontSize: 10,
      cellPadding: 4,
      textColor: [0, 0, 0], // Black text
      lineColor: [0, 0, 0], // Black borders
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { cellWidth: 20 },  // Pass ID
      1: { cellWidth: 45 },  // Full Name
      2: { cellWidth: 70 },  // Email
      3: { cellWidth: 45 },  // Phone
      4: { cellWidth: 60 },  // Organization
      5: { cellWidth: 'auto' } // Role
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240] // Very light gray for alternate rows for readability in B&W printing
    }
  });

  doc.save(`Kizuna2026_Confirmed_List_${new Date().toISOString().split('T')[0]}.pdf`);
};
