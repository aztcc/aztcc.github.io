
        // --- Estado de la Calculadora ---
        let cvssState = {
            AV: 'N',
            AC: 'L',
            PR: 'H',
            UI: 'N',
            S: 'U',
            C: 'L',
            I: 'L',
            A: 'L'
        };

        // --- Coeficientes oficiales CVSS v3.1 ---
        const weights = {
            AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
            AC: { L: 0.77, H: 0.44 },
            PR: {
                // Depende de Scope (S)
                U: { N: 0.85, L: 0.62, H: 0.27 },
                C: { N: 0.85, L: 0.68, H: 0.50 }
            },
            UI: { N: 0.85, R: 0.62 },
            C: { N: 0.0, L: 0.22, H: 0.56 },
            I: { N: 0.0, L: 0.22, H: 0.56 },
            A: { N: 0.0, L: 0.22, H: 0.56 }
        };

        function setMetric(metric, value) {
            cvssState[metric] = value;
            calculateCVSS();
        }

        function calculateCVSS() {
            // 1. Obtener valores
            const av = weights.AV[cvssState.AV];
            const ac = weights.AC[cvssState.AC];
            const ui = weights.UI[cvssState.UI];
            const s_changed = cvssState.S === 'C';
            
            // PR depende de Scope
            const pr = s_changed ? weights.PR.C[cvssState.PR] : weights.PR.U[cvssState.PR];
            
            const c = weights.C[cvssState.C];
            const i = weights.I[cvssState.I];
            const a = weights.A[cvssState.A];

            // 2. Calcular ISS (Impact Sub-Score)
            const iss = 1 - (1 - c) * (1 - i) * (1 - a);

            // 3. Calcular Impacto
            let impact = 0;
            if (!s_changed) {
                impact = 6.42 * iss;
            } else {
                impact = 7.52 * (iss - 0.029) - 3.25 * Math.pow((iss - 0.02), 15);
            }

            // 4. Calcular Explotabilidad
            const exploitability = 8.22 * av * ac * pr * ui;

            // 5. Calcular Puntuación Base
            let baseScore = 0;
            if (impact > 0) {
                if (!s_changed) {
                    baseScore = Math.min((impact + exploitability), 10);
                } else {
                    baseScore = Math.min(1.08 * (impact + exploitability), 10);
                }
            }

            // Redondear al décimo superior de acuerdo a la especificación oficial de FIRST (con precisión flotante)
            baseScore = Math.ceil(baseScore * 10) / 10;
            
            if (iss <= 0) {
                baseScore = 0.0;
            }

            // 6. Asignar severidad
            let severity = "NINGUNA";
            let severityClass = "none";
            if (baseScore >= 0.1 && baseScore <= 3.9) {
                severity = "BAJA";
                severityClass = "low";
            } else if (baseScore >= 4.0 && baseScore <= 6.9) {
                severity = "MEDIA";
                severityClass = "medium";
            } else if (baseScore >= 7.0 && baseScore <= 8.9) {
                severity = "ALTA";
                severityClass = "high";
            } else if (baseScore >= 9.0 && baseScore <= 10.0) {
                severity = "CRITICAL";
                severityClass = "critical";
            }

            // 7. Actualizar interfaz gráfica
            document.getElementById("scoreNumText").textContent = baseScore.toFixed(1);
            document.getElementById("scoreSeverityText").textContent = severity;
            
            const circle = document.getElementById("scoreDisplayCircle");
            circle.className = "score-display " + severityClass;

            // Generar string de vector
            const vector = `CVSS:3.1/AV:${cvssState.AV}/AC:${cvssState.AC}/PR:${cvssState.PR}/UI:${cvssState.UI}/S:${cvssState.S}/C:${cvssState.C}/I:${cvssState.I}/A:${cvssState.A}`;
            document.getElementById("vectorStringText").textContent = vector;

            // Actualizar clases activas en los botones
            updateActiveButtons();
        }

        function updateActiveButtons() {
            // Quitar clase active de todos los botones de la calculadora
            const buttons = document.querySelectorAll(".calc-btn");
            buttons.forEach(btn => {
                const metric = btn.getAttribute("data-metric");
                const val = btn.getAttribute("data-val");
                if (cvssState[metric] === val) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        }

        function loadReportScenario() {
            cvssState = {
                AV: 'N',
                AC: 'L',
                PR: 'H',
                UI: 'N',
                S: 'U',
                C: 'L',
                I: 'L',
                A: 'L'
            };
            calculateCVSS();
        }



        // --- Inicialización ---
        window.addEventListener("DOMContentLoaded", () => {
            loadReportScenario();
        });
