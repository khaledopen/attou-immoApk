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
            self.drawString(54, 790, "ATTOUHOME — PRÉPARATION À LA SOUTENANCE")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.75)
            self.line(54, 782, 541, 782)
            
        # Pied de page (sur toutes les pages)
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748b")) # Gris ardoise
        page_text = f"Page {self._pageNumber} sur {page_count}"
        self.drawRightString(541, 45, page_text)
        self.drawString(54, 45, "AttouHome © 2026 — Document de préparation")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(54, 60, 541, 60)
        
        self.restoreState()

def convert_md_to_pdf(md_path, pdf_path):
    # Configurer le document
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        rightMargin=54,
        leftMargin=54,
        topMargin=72,
        bottomMargin=72
    )
    
    # Styles
    styles = getSampleStyleSheet()
    
    # Styles personnalisés
    # Couleurs
    c_navy = colors.HexColor("#0f172a")
    c_sky = colors.HexColor("#0ea5e9")
    c_orange = colors.HexColor("#f97316")
    c_gray = colors.HexColor("#334155")
    c_light_bg = colors.HexColor("#f8fafc")
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=c_navy,
        spaceAfter=15
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=c_gray,
        spaceAfter=25
    )
    
    h2_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=c_navy,
        spaceBefore=18,
        spaceAfter=10,
        keepWithNext=True
    )
    
    question_style = ParagraphStyle(
        'Question',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=c_orange,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )
    
    answer_style = ParagraphStyle(
        'Answer',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=c_gray,
        spaceAfter=8
    )
    
    bullet_style = ParagraphStyle(
        'BulletPoint',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=13,
        textColor=c_gray,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )
    
    normal_style = ParagraphStyle(
        'NormalText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=c_gray,
        spaceAfter=10
    )
    
    tip_style = ParagraphStyle(
        'TipText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#1e293b"),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    story = []
    
    # Lire et analyser le markdown
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    current_q_a = []
    in_q_a = False
    
    def flush_q_a():
        nonlocal current_q_a, in_q_a
        if current_q_a:
            story.append(KeepTogether(current_q_a))
            current_q_a = []
        in_q_a = False

    for line in lines:
        line_str = line.strip()
        
        # Ignorer les lignes vides si ce ne sont pas des espaces de formatage
        if not line_str:
            if in_q_a:
                current_q_a.append(Spacer(1, 4))
            else:
                story.append(Spacer(1, 6))
            continue
            
        # Titre (# )
        if line_str.startswith("# "):
            flush_q_a()
            title_text = line_str[2:]
            story.append(Paragraph(title_text, title_style))
            # Ajouter une ligne décorative sous le titre
            story.append(HRFlowable(width="100%", thickness=3, color=c_sky, spaceAfter=15, spaceBefore=5))
            
        # Section (## )
        elif line_str.startswith("## ") and not line_str.startswith("## Conseils"):
            flush_q_a()
            sec_text = line_str[3:]
            story.append(Spacer(1, 15))
            story.append(Paragraph(sec_text, h2_style))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=10, spaceBefore=2))
            
        # Section Conseils (spécial)
        elif line_str.startswith("## Conseils"):
            flush_q_a()
            sec_text = line_str[3:]
            story.append(Spacer(1, 15))
            story.append(Paragraph(sec_text, h2_style))
            story.append(HRFlowable(width="100%", thickness=2, color=c_orange, spaceAfter=10, spaceBefore=2))
            
        # Question (### Q : ou ###)
        elif line_str.startswith("### "):
            flush_q_a()
            in_q_a = True
            q_text = line_str[4:]
            current_q_a.append(Paragraph(q_text, question_style))
            
        # Réponse (**R :** ou **R:** ou commençant simplement par cela)
        elif line_str.startswith("**R :**") or line_str.startswith("**R:**") or line_str.startswith("**R**"):
            # Nettoyer le markdown du préfixe
            clean_ans = re.sub(r'^\*\*R\s*:\s*\*\*\s*', '', line_str)
            clean_ans = re.sub(r'^\*\*R:\*\*\s*', '', clean_ans)
            # Réintégrer le R: en gras au format HTML
            formatted_ans = f"<b>R :</b> {clean_ans}"
            
            # Formater le markdown en gras en ligne en HTML <b>
            formatted_ans = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', formatted_ans)
            formatted_ans = re.sub(r'\*(.*?)\*', r'<i>\1</i>', formatted_ans)
            
            p = Paragraph(formatted_ans, answer_style)
            if in_q_a:
                current_q_a.append(p)
            else:
                story.append(p)
                
        # Puces dans les questions-réponses ou listes standard
        elif line_str.startswith("* ") or line_str.startswith("- "):
            bullet_text = line_str[2:]
            # Formater le markdown en gras/italique
            bullet_text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', bullet_text)
            bullet_text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', bullet_text)
            
            # Utiliser le style approprié
            is_conseil = "Conseils" in str(story[-1] if story else "") or (len(story) > 1 and "Conseils" in str(story[-2]))
            p = Paragraph(f"• {bullet_text}", tip_style if is_conseil else bullet_style)
            
            if in_q_a:
                current_q_a.append(p)
            else:
                story.append(p)
                
        # Règles horizontales
        elif line_str == "---":
            flush_q_a()
            story.append(Spacer(1, 10))
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e2e8f0"), spaceAfter=10))
            
        # Texte normal ou paragraphes
        else:
            # Formater le markdown en gras/italique
            formatted_text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', line_str)
            formatted_text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', formatted_text)
            
            # Vérifier si ce texte appartient à un lien ou à un formatage spécial
            p = Paragraph(formatted_text, normal_style)
            if in_q_a:
                current_q_a.append(p)
            else:
                # Si nous étions en train de lire le texte d'introduction
                story.append(p)
                
    flush_q_a()
    
    # Construire le document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF généré avec succès : {pdf_path}")

if __name__ == "__main__":
    md_file = r"C:\Users\KT156S\.gemini\antigravity-ide\brain\38869f9e-2af9-4e47-843c-9c29fc5e997d\soutenance_prep.md"
    pdf_file = r"C:\Users\KT156S\Desktop\AttouHome\soutenance_prep.pdf"
    
    if os.path.exists(md_file):
        convert_md_to_pdf(md_file, pdf_file)
    else:
        print("Erreur : Le fichier markdown source n'existe pas.")
