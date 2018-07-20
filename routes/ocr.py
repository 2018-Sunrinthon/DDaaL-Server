from PIL import Image
from pytesseract import *

import sys

def OCR(lang='kor'):
    print(sys.argv)
    im = Image.open(sys.argv[0])
    text = image_to_string(im, lang=lang)

    print(text)

OCR()
