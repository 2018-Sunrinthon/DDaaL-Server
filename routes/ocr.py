from PIL import Image
from pytesseract import *

import sys;

def OCR(lang='kor'):
    im = Image.open(sys.imgPath)
    text = image_to_string(im, lang=lang)

    print(text)

OCR()
