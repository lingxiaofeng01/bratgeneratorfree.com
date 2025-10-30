# Redacted Text Generator - Quick Usage Guide

## 🚀 Quick Start

Visit `/generators/redacted-text` to access the Redacted Text Generator.

## 📝 Basic Usage

### Step 1: Enter Your Text
Paste or type the text you want to redact in the **Input Text** area.

**Example:**
```
John Smith's email is john@example.com and his phone is (555) 123-4567.
```

### Step 2: Choose Redaction Method

#### Option A: Custom Words (Manual)
Enter specific words or phrases to redact in the "Words to Redact" field, separated by commas:
```
John Smith, john@example.com, (555) 123-4567
```

#### Option B: Quick Redact (Automatic)
Toggle any of these options to automatically detect and redact:
- 📧 **Email Addresses** - Automatically finds and redacts all email addresses
- 🔗 **URLs** - Automatically finds and redacts all web URLs
- 📞 **Phone Numbers** - Automatically finds and redacts phone numbers (various formats)
- 🔢 **All Numbers** - Redacts all numeric values

### Step 3: Review Output
The redacted text appears instantly in the **Output** section:
```
████ █████'s email is ████████████████ and his phone is ██████████████.
```

### Step 4: Export
- **Copy**: Click the "Copy" button to copy redacted text to clipboard
- **Download**: Click "Download" to save as a .txt file
- **Show Original**: Toggle to verify what was redacted

## 🎯 Advanced Features

### Advanced Options
Click "▼ Advanced Options" to access:

1. **Case Insensitive Matching** (Default: ON)
   - When ON: "John" matches "john", "JOHN", "JoHn"
   - When OFF: Only exact case matches

2. **Whole Word Matching Only** (Default: OFF)
   - When ON: "cat" only matches "cat", not "category" or "scattered"
   - When OFF: Matches partial words too

### Sample Text Presets
Click these buttons to load realistic examples:
- **Legal Document** - Contract with case numbers, SSNs, addresses
- **Medical Record** - Patient info with MRN, DOB, contact details
- **Business Contract** - Corporate agreement with account numbers, emails

## 📊 Statistics Display

The output section shows real-time statistics:
- **Redacted Sections**: Number of items redacted
- **Characters Hidden**: Total characters replaced with █
- **Character/Word Count**: Input and output text metrics

## 🔒 Privacy & Security

### 100% Client-Side Processing
- All redaction happens in your browser
- No data is sent to servers
- No storage or logging
- Complete privacy guaranteed

### Privacy Indicators
Look for these badges throughout the interface:
- 🔒 **100% Private** - Client-side processing
- ✅ **No Data Stored** - Nothing saved on servers

## 💡 Pro Tips

### 1. Combine Methods
Use both custom words AND quick redact options together:
- Enter specific names in "Words to Redact"
- Toggle "Email Addresses" and "Phone Numbers"
- All will be redacted simultaneously

### 2. Use Comma Separation
When entering multiple custom words:
```
✅ Good: John Smith, Jane Doe, ABC Corp
❌ Bad: John Smith Jane Doe ABC Corp
```

### 3. Verify Before Sharing
Always use "Show Original" to verify:
- All sensitive info is redacted
- No partial redactions
- Document still makes sense

### 4. Download for Records
Use the Download button to:
- Keep a copy of redacted text
- Share via email or messaging
- Archive for compliance

## 🎨 Use Case Examples

### Legal Document Redaction
**Input:**
```
The defendant, John Doe (SSN: 123-45-6789), residing at 123 Main Street, 
contacted attorney Sarah Johnson at sarah.johnson@lawfirm.com regarding 
case #2024-CV-12345.
```

**Words to Redact:**
```
John Doe, 123-45-6789, 123 Main Street, Sarah Johnson, sarah.johnson@lawfirm.com, 2024-CV-12345
```

**Output:**
```
The defendant, ████ ███ (SSN: ████████████), residing at ███ ████ ██████, 
contacted attorney █████ ███████ at ████████████████████████████ regarding 
case #████████████████.
```

### Medical Record Redaction
**Input:**
```
Patient Mary Smith (DOB: 01/15/1980, MRN: 987654) was seen by 
Dr. Robert Chen on 03/20/2024. Contact: mary.smith@email.com, 
Phone: (555) 234-5678.
```

**Quick Redact:**
- ✅ Email Addresses
- ✅ Phone Numbers

**Words to Redact:**
```
Mary Smith, 01/15/1980, 987654, Robert Chen, 03/20/2024
```

### Business Document Redaction
**Input:**
```
Contract between ABC Corp and XYZ Ltd. Contact: john.manager@abccorp.com, 
Phone: +1-555-123-4567. Account #: 4532-1234-5678-9012.
```

**Quick Redact:**
- ✅ Email Addresses
- ✅ Phone Numbers
- ✅ All Numbers

## 🔧 Troubleshooting

### Issue: Text Not Redacting
**Solution:**
- Check spelling in "Words to Redact"
- Try turning OFF "Whole Word Matching"
- Verify "Case Insensitive" is ON

### Issue: Too Much Redacted
**Solution:**
- Turn ON "Whole Word Matching"
- Be more specific with custom words
- Review Advanced Options settings

### Issue: Partial Redaction
**Solution:**
- Add complete phrase to "Words to Redact"
- Check for extra spaces or punctuation
- Use "Show Original" to identify issues

## 📱 Mobile Usage

### Mobile-Optimized Features
- Touch-friendly toggle switches
- Responsive layout (stacked on mobile)
- Easy copy/download buttons
- Collapsible navigation menu

### Mobile Tips
- Use landscape mode for better view
- Tap "Show Original" to verify
- Use native share after copying

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + A**: Select all text in input
- **Ctrl/Cmd + C**: Copy (when text selected)
- **Ctrl/Cmd + V**: Paste into input

## 🆘 Support

### Need Help?
- Read the FAQ section on the page
- Check this usage guide
- Visit `/contact` for support
- Review documentation in `docs/REDACTED_TEXT_GENERATOR.md`

### Report Issues
- GitHub Issues (if applicable)
- Contact form at `/contact`
- Email support

## 📚 Additional Resources

- **Main Documentation**: `docs/REDACTED_TEXT_GENERATOR.md`
- **All Generators**: `/generators`
- **Blog**: `/blog` (for tutorials and tips)
- **Privacy Policy**: `/privacy`
- **Terms of Service**: `/terms`

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0

Happy Redacting! 🔒✨

