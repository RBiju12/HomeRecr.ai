import spacy
import numpy as np

nlp = spacy.load("en_core_web_md")

def cosine_simalarity(vectorA, vectorB):
    dot_product = np.dot(vectorA, vectorB)
    magnitudeA = np.linalg.norm(vectorA)
    magnitudeB = np.linalg.norm(vectorB)

    if magnitudeA == 0 or magnitudeB == 0:
        return 0.0

    return dot_product / (magnitudeA * magnitudeB)



    