from fastapi import FastAPI
from pydantic import BaseModel
from sympy import Symbol, sympify, simplify, diff
from sympy.core.sympify import SympifyError

app = FastAPI(title="Math Checker")

class AnalyzeRequest(BaseModel):
    text: str

class DerivativeRequest(BaseModel):
    expression: str
    variable: str = "x"

@app.get('/health')
def health():
    return {"ok": True}

@app.post('/analyze')
def analyze(req: AnalyzeRequest):
    text = req.text.replace('^', '**')
    x = Symbol('x')
    response = {
        "normalized": text,
        "can_parse": False,
        "simplified": None,
        "derivative": None,
        "notes": []
    }

    try:
        expr = sympify(text)
        response["can_parse"] = True
        response["simplified"] = str(simplify(expr))
        try:
            response["derivative"] = str(diff(expr, x))
        except Exception:
            response["notes"].append("Derivative not available for this expression.")
    except SympifyError:
        response["notes"].append("Could not parse expression with SymPy.")
    except Exception as exc:
        response["notes"].append(str(exc))

    return response

@app.post('/differentiate')
def differentiate(req: DerivativeRequest):
    variable = Symbol(req.variable)
    expr = sympify(req.expression.replace('^', '**'))
    return {
        "expression": str(expr),
        "variable": req.variable,
        "derivative": str(diff(expr, variable))
    }
