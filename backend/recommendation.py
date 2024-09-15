import spacy
import numpy as np

nlp = spacy.load("en_core_web_md")

def getVector(**kwargs):
    vectors = [nlp(key).vector if isinstance(key, str) else key for key in kwargs.items()]
    return np.array(vectors)


def cosine_simalarity(vectorA, vectorB):
    dot_product = np.dot(vectorA, vectorB)
    magnitudeA = np.linalg.norm(vectorA)
    magnitudeB = np.linalg.norm(vectorB)

    return dot_product / (magnitudeA * magnitudeB)



    