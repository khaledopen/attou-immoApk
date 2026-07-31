import os
import re
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, PageBreak, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#0f172a")) # Bleu marine
        
        # En-tête (sur toutes les pages sauf la page 1)
        if self._pageNumber > 1:
            self.drawString(54, 790, "ATTOUHOME — PRODUCT DESIGN SPECIFICATION (PDS)")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.75)
            self.line(54, 782, 541, 782)
            
        # Pied de page (sur toutes les pages)
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748b")) # Gris ardoise
        page_text = f"Page {self._pageNumber} sur {page_count}"
        self.drawRightString(541, 45, page_text)
        self.drawString(54, 45, "AttouHome © 2026 — Spécifications de Conception de Produit")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(54, 60, 541, 60)
        
        self.restoreState()

def convert_md_to_pdf(md_path, pdf_path):
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        rightMargin=54,
        leftMargin=54,
        topMargin=72,
        bottomMargin=72
    )
    
    styles = getSampleStyleSheet()
    
    c_navy = colors.HexColor("#0f172a")
    c_sky = colors.HexColor("#0ea5e9")
    c_orange = colors.HexColor("#f97316")
    c_gray = colors.HexColor("#334155")
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=c_navy,
        spaceAfter=15
    )
    
    h2_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=c_navy,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )
    
    h3_style = ParagraphStyle(
        'SubSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=c_sky,
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )
    
    normal_style = ParagraphStyle(
        'NormalText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=c_gray,
        spaceAfter=8
    )
    
    bullet_style = ParagraphStyle(
        'BulletPoint',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=c_gray,
        leftIndent=15,
        spaceAfter=4
    )

    story = []
    
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    in_code_block = False
    
    for line in lines:
        line_str = line.strip()
        
        # Gestion des blocs de code / diagrammes ASCII (on les ignore ou on les traite simplement)
        if line_str.startswith("```"):
            in_code_block = not in_code_block
            continue
            
        if in_code_block:
            # On ignore les lignes des diagrammes ASCII compliqués dans le PDF pour garder une mise en page propre
            continue
            
        if not line_str:
            story.append(Spacer(1, 5))
            continue
            
        # Titre principal
        if line_str.startswith("# "):
            title_text = line_str[2:]
            story.append(Paragraph(title_text, title_style))
            story.append(HRFlowable(width="100%", thickness=2.5, color=c_sky, spaceAfter=12, spaceBefore=4))
            
        # H2
        elif line_str.startswith("## "):
            sec_text = line_str[3:]
            # Nettoyer d'éventuels émojis
            sec_text = re.sub(r'[^\w\s\-\.\,\’\:\(\)\/\&\#\•\%\@]', '', sec_text)
            story.append(Spacer(1, 10))
            story.append(Paragraph(sec_text.strip(), h2_style))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=8, spaceBefore=2))
            
        # H3
        elif line_str.startswith("### "):
            sub_text = line_str[4:]
            sub_text = re.sub(r'[^\w\s\-\.\,\’\:\(\)\/\&\#\•\%\@]', '', sub_text)
            story.append(Paragraph(sub_text.strip(), h3_style))
            
        # Listes à puces
        elif line_str.startswith("* ") or line_str.startswith("- ") or re.match(r'^\d+\.\s', line_str):
            bullet_char = "• "
            if line_str.startswith("* ") or line_str.startswith("- "):
                bullet_text = line_str[2:]
            else:
                match = re.match(r'^(\d+\.)\s', line_str)
                bullet_char = match.group(1) + " "
                bullet_text = line_str[len(bullet_char):]
                
            bullet_text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', bullet_text)
            bullet_text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', bullet_text)
            # Supprimer les liens MD
            bullet_text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', bullet_text)
            story.append(Paragraph(f"{bullet_char}{bullet_text}", bullet_style))
            
        # Séparateur horizontal
        elif line_str == "---":
            story.append(Spacer(1, 8))
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e2e8f0"), spaceAfter=8))
            
        # Paragraphes normaux
        else:
            formatted_text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', line_str)
            formatted_text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', formatted_text)
            # Supprimer les liens MD
            formatted_text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', formatted_text)
            story.append(Paragraph(formatted_text, normal_style))
            
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF généré avec succès : {pdf_path}")

if __name__ == "__main__":
    md_file = r"C:\Users\KT156S\Desktop\AttouHome\PDS_AttouHome.md"
    pdf_file = r"C:\Users\KT156S\Desktop\AttouHome\PDS_AttouHome.pdf"
    convert_md_to_pdf(md_file, pdf_file)
