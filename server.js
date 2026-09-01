import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kizuna-seminar',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize Database Tables
async function initDb() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ticketNumber VARCHAR(50) UNIQUE NOT NULL,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        organization VARCHAR(255),
        roleOrField VARCHAR(255),
        attendeeType VARCHAR(100),
        attendanceMode VARCHAR(100),
        translationNeeded BOOLEAN,
        languagePreference VARCHAR(10),
        seatZone VARCHAR(100),
        qrValue VARCHAR(255),
        status ENUM('Confirmed', 'Pending', 'Hold', 'Rejected') DEFAULT 'Pending',
        registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        settingKey VARCHAR(100) UNIQUE NOT NULL,
        settingValue TEXT,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully.');
    connection.release();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

// Default Template
const defaultTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #16605b; border-radius: 12px; overflow: hidden; background-color: #041e1d; color: #ffffff;">
  <!-- Header -->
  <div style="background-color: #083331; padding: 30px; text-align: center; border-bottom: 2px solid #e62b32;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">KIZUNA 2026</h1>
    <p style="color: #79ded7; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px;">OKAYAMA-BANGLADESH PARTNERSHIP SEMINAR</p>
  </div>
  
  <!-- Body -->
  <div style="padding: 40px 30px; background-color: #052322;">
    <h2 style="color: #ffffff; margin-top: 0;">Congratulations {{fullName}},</h2>
    <p style="color: #a0d4cf; line-height: 1.6;">You are selected for the Kizuna 2026 Okayama-Bangladesh Partnership Seminar. Your reservation has been successfully confirmed.</p>
    
    <div style="background-color: #083331; border-left: 4px solid #79ded7; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <h3 style="margin-top: 0; color: #79ded7; font-size: 14px; text-transform: uppercase;">Event Details</h3>
      <p style="margin: 5px 0; color: #ffffff;"><strong>Date:</strong> Saturday, September 19, 2026</p>
      <p style="margin: 5px 0; color: #ffffff;"><strong>Time:</strong> 14:00 – 16:00 (Doors Open 13:30)</p>
      <p style="margin: 5px 0; color: #ffffff;"><strong>Venue:</strong> Okayama International Exchange Center</p>
      <p style="margin: 5px 0; color: #a0d4cf; font-size: 12px;">2-2-1 Hokan-cho, Kita-ku, Okayama City, Okayama</p>
    </div>
    
    <div style="text-align: center; margin: 40px 0;">
      <p style="color: #a0d4cf; font-size: 14px; margin-bottom: 10px;">Please present this Pass ID at the venue:</p>
      <div style="background-color: #e62b32; color: #ffffff; display: inline-block; padding: 15px 40px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 2px; box-shadow: 0 4px 15px rgba(230, 43, 50, 0.4);">
        {{passId}}
      </div>
      <p style="color: #e62b32; font-size: 12px; margin-top: 15px; font-weight: bold;">PLEASE REMEMBER OR SCREENSHOT THIS PASS ID.</p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background-color: #041e1d; padding: 20px; text-align: center; border-top: 1px solid #16605b;">
    <p style="color: #a0d4cf; margin: 0; font-size: 12px;">© 2026 TSI Group. All Rights Reserved.</p>
  </div>
</div>
`;

// Helper: Compile Template
const compileTemplate = (templateStr, fullName, passId) => {
  return (templateStr || defaultTemplate)
    .replace(/{{fullName}}/g, fullName || '')
    .replace(/{{passId}}/g, passId || '');
};

// Send Email Helper
const sendConfirmationEmail = async (email, fullName, passId) => {
  try {
    const [rows] = await pool.query("SELECT settingValue FROM settings WHERE settingKey = 'smtp_config'");
    if (rows.length === 0 || !rows[0].settingValue) return false;
    
    const config = JSON.parse(rows[0].settingValue);
    if (!config.email || !config.password) return false;

    const transporter = nodemailer.createTransport({
      host: config.host || 'smtp.hostinger.com', // Default to hostinger or gmail
      port: parseInt(config.port) || 465,
      secure: parseInt(config.port) === 465, // true for 465, false for 587
      auth: {
        user: config.email,
        pass: config.password,
      },
    });

    const html = compileTemplate(config.template, fullName, passId);

    const mailOptions = {
      from: `"Kizuna 2026 Seminar" <${config.email}>`,
      to: email,
      subject: 'Confirmation: Kizuna 2026 OKAYAMA-BANGLADESH PARTNERSHIP SEMINAR',
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
};


// Routes
app.post('/api/register', async (req, res) => {
  try {
    const data = req.body;
    
    const randomTicketNum = `KZ26-OKB-${Math.floor(1000 + Math.random() * 9000)}`;
    const zones = ['VIP-Front Row', 'Zone A (Main Floor)', 'Zone B (Center)', 'Zone C (Executive)'];
    const seatZone = zones[Math.floor(Math.random() * zones.length)];
    const qrValue = `https://kizuna2026.okayama-bangladesh.org/verify?ticket=${randomTicketNum}&name=${encodeURIComponent(data.fullName)}`;
    
    const [result] = await pool.query(
      `INSERT INTO registrations (
        ticketNumber, fullName, email, phone, organization, roleOrField, 
        attendeeType, attendanceMode, translationNeeded, languagePreference, 
        seatZone, qrValue, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        randomTicketNum, data.fullName, data.email, data.phone, data.organization || '', data.roleOrField || '',
        data.attendeeType || 'business_exec', data.attendanceMode || 'in_person', 
        data.translationNeeded === true ? 1 : 0, data.languagePreference || 'en',
        seatZone, qrValue, 'Pending'
      ]
    );

    const [rows] = await pool.query('SELECT * FROM registrations WHERE id = ?', [result.insertId]);
    const newRecord = rows[0];
    const ticket = {
      ticketNumber: newRecord.ticketNumber,
      attendee: {
        fullName: newRecord.fullName,
        email: newRecord.email,
        phone: newRecord.phone,
        organization: newRecord.organization,
        roleOrField: newRecord.roleOrField,
        attendeeType: newRecord.attendeeType,
        attendanceMode: newRecord.attendanceMode,
        translationNeeded: !!newRecord.translationNeeded,
        languagePreference: newRecord.languagePreference,
      },
      registeredAt: newRecord.registeredAt,
      seatZone: newRecord.seatZone,
      qrValue: newRecord.qrValue,
      status: newRecord.status,
      id: newRecord.id
    };

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM registrations ORDER BY registeredAt DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/api/registrations/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Confirmed', 'Pending', 'Hold', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const [userRows] = await pool.query('SELECT * FROM registrations WHERE id = ?', [id]);
    const user = userRows[0];

    await pool.query('UPDATE registrations SET status = ? WHERE id = ?', [status, id]);
    
    let emailSent = false;
    if (status === 'Confirmed' && user && user.status !== 'Confirmed') {
      const serialPassId = `Kizuna ${3000 + parseInt(id)}`;
      emailSent = await sendConfirmationEmail(user.email, user.fullName, serialPassId);
    }

    res.json({ message: 'Status updated successfully', status, emailSent });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM registrations WHERE id = ?', [id]);
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Settings API
app.get('/api/settings/mail', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT settingValue FROM settings WHERE settingKey = 'smtp_config'");
    if (rows.length > 0 && rows[0].settingValue) {
      const config = JSON.parse(rows[0].settingValue);
      return res.json({ 
        host: config.host || 'smtp.hostinger.com',
        port: config.port || '465',
        email: config.email || '', 
        password: config.password || '',
        template: config.template || defaultTemplate
      });
    }
    res.json({ host: 'smtp.hostinger.com', port: '465', email: '', password: '', template: defaultTemplate });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/settings/mail', async (req, res) => {
  try {
    const { host, port, email, password, template } = req.body;
    
    const settingValue = JSON.stringify({ host, port, email, password, template: template || defaultTemplate });
    
    await pool.query(`
      INSERT INTO settings (settingKey, settingValue) 
      VALUES ('smtp_config', ?) 
      ON DUPLICATE KEY UPDATE settingValue = ?
    `, [settingValue, settingValue]);

    res.json({ message: 'Mail settings saved successfully' });
  } catch (error) {
    console.error('Error saving mail settings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Event Settings API
app.get('/api/settings/event', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT settingValue FROM settings WHERE settingKey = 'event_config'");
    if (rows.length > 0 && rows[0].settingValue) {
      const config = JSON.parse(rows[0].settingValue);
      return res.json({ registrationOpen: config.registrationOpen !== false }); // default true
    }
    res.json({ registrationOpen: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/settings/event', async (req, res) => {
  try {
    const { registrationOpen } = req.body;
    
    const settingValue = JSON.stringify({ registrationOpen });
    
    await pool.query(`
      INSERT INTO settings (settingKey, settingValue) 
      VALUES ('event_config', ?) 
      ON DUPLICATE KEY UPDATE settingValue = ?
    `, [settingValue, settingValue]);

    res.json({ message: 'Event settings saved successfully' });
  } catch (error) {
    console.error('Error saving event settings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Generate Preview Template for Frontend
app.post('/api/settings/mail/preview', (req, res) => {
  const { template } = req.body;
  const html = compileTemplate(template, '[Participant Name]', 'Kizuna 3001');
  res.send(html);
});

// Catch-all route to serve the React app for non-API requests (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
  initDb();
});
