import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CompletionCertificateProps {
  userName: string;
  completionDate: Date;
  cycleNumber: number;
  onDownload?: () => void;
  bibleTranslation?: string;
}

// 2 Timothy 3:16-17 in all supported translations
const certificateVerses: { [key: string]: string } = {
  'ESV': '"All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work."',
  'KJV': '"All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works."',
  'NKJV': '"All Scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness, that the man of God may be complete, thoroughly equipped for every good work."',
  'NASB': '"All Scripture is inspired by God and profitable for teaching, for reproof, for correction, for training in righteousness; so that the man of God may be adequate, equipped for every good work."',
  'LSB': '"All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, for training in righteousness; so that the man of God may be equipped, having been thoroughly equipped for every good work."'
};

const CompletionCertificate = ({ 
  userName, 
  completionDate, 
  cycleNumber,
  onDownload,
  bibleTranslation = 'ESV'
}: CompletionCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const verseText = certificateVerses[bibleTranslation] || certificateVerses['ESV'];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      // Capture the certificate as canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      // Create PDF (8.5 x 11 inches at 72 DPI)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: 'letter',
      });

      // Calculate dimensions to fit the canvas on the PDF
      const imgWidth = 11;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download
      pdf.save(`Tune-My-Heart-Certificate-${userName.replace(/\s+/g, '-')}.pdf`);

      if (onDownload) {
        onDownload();
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Certificate */}
      <div 
        ref={certificateRef}
        className="bg-white p-12 certificate-container"
        style={{
          width: '1000px',
          height: '775px',
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        {/* Decorative Border */}
        <div className="h-full flex flex-col justify-between p-16" style={{
          border: '8px double #C4A962',
        }}>
          {/* Top Section - Logo */}
          <div className="text-center">
            <img 
              src="/tune-my-heart-logo.png" 
              alt="Tune My Heart" 
              className="h-14 mx-auto mb-3"
              crossOrigin="anonymous"
            />
            <div className="h-1 w-24 mx-auto" style={{backgroundColor: '#C4A962'}}></div>
          </div>

          {/* Middle Section - Content */}
          <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
            {/* Certificate Title */}
            <h1 className="text-3xl font-heading text-primary font-bold">
              Certificate of Completion
            </h1>

            {/* Presented To */}
            <p className="text-base font-body text-text-light italic">
              This certifies that
            </p>

            {/* User Name */}
            <h2 
              className="text-4xl font-heading text-primary font-bold my-3"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {userName}
            </h2>

            {/* Achievement Description */}
            <p className="text-base font-body text-text leading-relaxed max-w-xl mx-auto">
              has successfully completed the <span className="font-semibold">52-Week Bible Reading Plan</span>,
              encompassing 260 daily readings through the narratives of Scripture.
            </p>

            {/* Completion Details */}
            <div className="my-3">
              <p className="text-sm font-body text-text-light">
                Completed on <span className="font-semibold text-text">{formatDate(completionDate)}</span>
              </p>
              {cycleNumber > 1 && (
                <p className="text-xs font-body text-gold font-semibold mt-1">
                  {getOrdinal(cycleNumber)} Completion
                </p>
              )}
            </div>

            {/* Scripture */}
            <div className="border-t border-b border-gray-300 py-3 my-3 max-w-2xl mx-auto">
              <p className="text-xs font-body text-text-light italic leading-relaxed">
                {verseText}
              </p>
              <p className="text-xs font-body text-text-light mt-1">
                2 Timothy 3:16-17 ({bibleTranslation})
              </p>
            </div>
          </div>

          {/* Bottom Section - Footer */}
          <div className="text-center pt-4">
            <p className="text-xl font-heading text-primary font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Tune My Heart
            </p>
            <p className="text-sm font-body text-accent">
              tunemyheart.com
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 print:hidden">
        <button
          onClick={downloadPDF}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="btn-secondary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .certificate-container,
          .certificate-container * {
            visibility: visible;
          }
          .certificate-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
          @page {
            size: letter landscape;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CompletionCertificate;
