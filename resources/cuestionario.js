// ════════════════════════════════════════════════════════
//  SCENARIOS  (10 total: 6 phishing, 4 legítimo)
// ════════════════════════════════════════════════════════
const SCENARIOS = [
  {
    id: 1, type: 'email', isPhishing: true,
    from: 'Recursos Humanos', addr: 'rrhh@empresa-portal.com',
    to: 'usuario@empresa.com', avatarLetter: 'R', avatarColor: '#3949ab',
    subject: 'URGENTE: Actualización obligatoria de nómina', time: 'Hoy, 08:15 AM',
    body: `<p>Estimado empleado,</p><p>Hemos detectado un <strong>error en el procesamiento</strong> de tu cuenta de nómina para el próximo pago. Si no actualizas tu información bancaria en las próximas <strong>2 horas</strong>, tu salario podría ser retenido.</p><p>Por favor, ingresa al portal de empleados <strong>inmediatamente</strong> para verificar tus datos:</p><a href="#" class="btn-link-fake">Actualizar datos bancarios ahora →</a><br><br><small style="color:#aaa">Este mensaje fue enviado de manera automática. No respondas a este correo.</small>`,
    feedback: { verdict: 'phishing', explanation: 'Este correo utilizaba tácticas de urgencia extrema y una dirección de dominio falsa (@empresa-portal.com en lugar del dominio corporativo real).', signals: [{ t: 'Dirección sospechosa', d: 'El dominio real de RRHH no suele ser "empresa-portal.com"; pertenece a un tercero.' }, { t: 'Sentido de urgencia extrema', d: 'Amenaza con retener el salario en 2 horas para forzar una acción rápida e impulsiva.' }, { t: 'Enlace falso', d: 'El enlace no dirige a un portal interno conocido; lleva a un sitio de captura de datos.' }] }
  },
  {
    id: 2, type: 'email', isPhishing: true,
    from: 'Banamex Seguridad', addr: 'alertas@banamex-secure.net',
    to: 'usuario@correo.com', avatarLetter: 'B', avatarColor: '#c62828',
    subject: '⚠️ Actividad inusual detectada en tu cuenta', time: 'Hoy, 11:42 AM',
    body: `<p>Estimado cliente,</p><p>Hemos detectado un acceso no autorizado a tu cuenta desde una ubicación desconocida (<strong>IP: 185.220.101.47, Rusia</strong>).</p><p>Para proteger tu dinero, tu cuenta ha sido <strong>temporalmente suspendida</strong>. Debes verificar tu identidad en las próximas <strong>24 horas</strong> o se cancelará permanentemente.</p><a href="#" class="btn-link-fake">Verificar identidad y reactivar cuenta →</a><br><br><small style="color:#aaa">Banamex — Protegiendo tu patrimonio desde 1884.</small>`,
    feedback: { verdict: 'phishing', explanation: 'Los bancos reales nunca piden que "verifiques tu identidad" a través de un enlace en correo. Además, el dominio es falso.', signals: [{ t: 'Dominio no oficial', d: '"banamex-secure.net" no es el dominio real del banco; el oficial es banamex.com.' }, { t: 'IP inventada para asustar', d: 'Mostrar una IP extranjera busca generar pánico inmediato en el usuario.' }, { t: 'Amenaza de cancelación', d: 'Los bancos no cancelan cuentas por no hacer clic en un correo; es presión psicológica.' }] }
  },
  {
    id: 3, type: 'email', isPhishing: false,
    from: 'Google Calendar', addr: 'calendar-notification@google.com',
    to: 'usuario@empresa.com', avatarLetter: 'G', avatarColor: '#4caf50',
    subject: 'Invitación: Reunión semanal de equipo — Viernes 10:00 AM', time: 'Ayer, 04:50 PM',
    body: `<p>Has recibido una invitación de <strong>Ana García (ana.garcia@empresa.com)</strong>:</p><p><strong>📅 Reunión semanal de equipo</strong><br>Viernes, 21 de marzo · 10:00 – 11:00 AM<br>Enlace de Google Meet: meet.google.com/abc-defg-hij</p><p>Agenda: Revisión de avances Q1, planeación de sprint 14.</p><p>Confirmación: <a href="#">Aceptar</a> · <a href="#">Rechazar</a> · <a href="#">Quizás</a></p><br><small style="color:#aaa">Enviado por Google Calendar en nombre de ana.garcia@empresa.com</small>`,
    feedback: { verdict: 'legit', explanation: 'Esta es una notificación legítima de Google Calendar. El remitente proviene de un dominio oficial de Google y la invitación contiene información interna coherente.', signals: [{ t: 'Dominio oficial', d: '"calendar-notification@google.com" es un remitente válido y conocido de Google.' }, { t: 'Sin urgencia ni amenaza', d: 'No hay presión de tiempo, amenazas ni solicitudes de datos sensibles.' }, { t: 'Información consistente', d: 'El remitente interno (ana.garcia@empresa.com) y los detalles de la reunión son coherentes.' }] }
  },
  {
    id: 4, type: 'email', isPhishing: true,
    from: 'Netflix', addr: 'no-reply@netflix-support-mx.com',
    to: 'usuario@correo.com', avatarLetter: 'N', avatarColor: '#e53935',
    subject: 'Tu cuenta de Netflix ha sido suspendida', time: 'Hoy, 07:30 AM',
    body: `<p>Hola,</p><p>Hemos tenido problemas para procesar tu pago más reciente. Tu cuenta ha sido <strong>suspendida temporalmente</strong>.</p><p>Para evitar la cancelación definitiva de tu suscripción y perder tus listas y perfiles, actualiza tu método de pago en las próximas <strong>48 horas</strong>.</p><a href="#" class="btn-link-fake" style="background:#e53935;">Actualizar método de pago →</a><br><br><small style="color:#aaa">© 2024 Netflix, Inc. · 100 Winchester Circle, Los Gatos, CA</small>`,
    feedback: { verdict: 'phishing', explanation: 'El dominio del remitente es falso. Netflix siempre envía desde @netflix.com, nunca desde "netflix-support-mx.com".', signals: [{ t: 'Dominio falso', d: '"netflix-support-mx.com" imita a Netflix pero no es su dominio oficial (@netflix.com).' }, { t: 'Urgencia fabricada', d: 'Las 48 horas de plazo buscan que actúes antes de revisar si el correo es real.' }, { t: 'Enlace de pago sospechoso', d: 'Netflix redirige al usuario dentro de su app o página oficial, no a través de botones en correos.' }] }
  },
  {
    id: 5, type: 'email', isPhishing: true,
    from: 'SAT México — Devoluciones', addr: 'devoluciones@sat-fiscal.org',
    to: 'contribuyente@correo.com', avatarLetter: 'S', avatarColor: '#1565c0',
    subject: 'Tienes una devolución fiscal pendiente de $4,280 MXN', time: 'Hoy, 09:15 AM',
    body: `<p>Estimado contribuyente,</p><p>El Servicio de Administración Tributaria (SAT) ha determinado que tienes derecho a una <strong>devolución fiscal de $4,280.00 MXN</strong> correspondiente al ejercicio fiscal 2023.</p><p>Para recibir tu devolución, deberás proporcionar tus datos bancarios actualizados a través del portal seguro en un plazo no mayor a <strong>72 horas</strong>:</p><a href="#" class="btn-link-fake" style="background:#1565c0;">Solicitar mi devolución →</a><br><br><small style="color:#aaa">SAT México · Av. Hidalgo 77, Col. Guerrero, CDMX</small>`,
    feedback: { verdict: 'phishing', explanation: 'El SAT real utiliza el dominio @sat.gob.mx. Ninguna institución de gobierno mexicana opera desde dominios .org privados para devoluciones.', signals: [{ t: 'Dominio gubernamental falso', d: 'El dominio oficial del SAT es sat.gob.mx. El correo proviene de "sat-fiscal.org", un dominio privado.' }, { t: 'Devolución no solicitada', d: 'Las devoluciones del SAT son tramitadas por el contribuyente desde el portal oficial, no notificadas por correo.' }, { t: 'Solicita datos bancarios', d: 'Pedir datos bancarios por correo es una señal de alerta crítica en cualquier contexto.' }] }
  },
  {
    id: 6, type: 'email', isPhishing: false,
    from: 'Soporte TI — Empresa', addr: 'ti-soporte@empresa.com',
    to: 'todos@empresa.com', avatarLetter: 'T', avatarColor: '#607d8b',
    subject: 'Mantenimiento programado del servidor — Sábado 01:00–04:00 AM', time: 'Lunes, 03:10 PM',
    body: `<p>Equipo,</p><p>Les informamos que el próximo <strong>sábado 22 de marzo</strong> se realizará mantenimiento preventivo en los servidores corporativos entre las <strong>01:00 y las 04:00 AM</strong>.</p><p>Durante ese período, los siguientes servicios estarán sin disponibilidad:</p><ul style="padding-left:20px; color:#333;"><li>VPN corporativa</li><li>Correo electrónico (Outlook Web)</li><li>SharePoint / OneDrive</li></ul><p>No es necesario realizar ninguna acción de tu parte. Si tienes dudas, contáctanos en la extensión <strong>1234</strong>.</p><p>Atentamente,<br><strong>Equipo de Soporte TI</strong></p>`,
    feedback: { verdict: 'legit', explanation: 'Esta es una comunicación interna legítima del área de TI. No solicita datos, no hay urgencia y proviene del dominio corporativo oficial.', signals: [{ t: 'Dominio corporativo real', d: '"ti-soporte@empresa.com" es un remitente interno esperado y coherente.' }, { t: 'Sin solicitud de acción urgente', d: 'El correo no pide clic en ningún enlace ni datos personales.' }, { t: 'Información operativa normal', d: 'Los avisos de mantenimiento programado son comunicaciones estándar del área de TI.' }] }
  },
  {
    id: 7, type: 'sms', isPhishing: true,
    phone: '+52 1 800 555 7823', carrier: 'DHL Express MX', time: 'Hoy, 2:34 PM',
    body: `Tu paquete DHL #MX9284710 NO pudo ser entregado hoy por dirección incorrecta. Confirma tu domicilio en las próximas 12h o será devuelto: <a href="#">https://dhl-mx-entrega.xyz/confirmar</a>`,
    feedback: { verdict: 'phishing', explanation: 'Este SMS es un intento de smishing (phishing por SMS). El enlace lleva a un dominio falso que imita a DHL para robar datos personales o de tarjeta.', signals: [{ t: 'Dominio de enlace falso', d: '"dhl-mx-entrega.xyz" no es el dominio oficial de DHL (dhl.com); el TLD ".xyz" es señal de alerta.' }, { t: 'Sin número de rastreo verificable', d: 'Los números de guía DHL tienen formato estándar; este parece generado aleatoriamente.' }, { t: 'Urgencia de 12 horas', d: 'La presión de tiempo busca que actúes impulsivamente sin verificar el mensaje.' }] }
  },
  {
    id: 8, type: 'email', isPhishing: false,
    from: 'Recursos Humanos', addr: 'rrhh@empresa.com',
    to: 'usuario@empresa.com', avatarLetter: 'R', avatarColor: '#9c27b0',
    subject: 'Encuesta de clima laboral 2024 — Tu opinión importa', time: 'Ayer, 10:00 AM',
    body: `<p>Hola,</p><p>Como parte de nuestra iniciativa anual de <strong>bienestar organizacional</strong>, te invitamos a responder la encuesta de clima laboral 2024.</p><p>La encuesta es completamente <strong>anónima</strong>, tarda aproximadamente <strong>10 minutos</strong> y estará disponible hasta el <strong>31 de marzo</strong>.</p><p><a href="#">👉 Acceder a la encuesta</a></p><p>Gracias por contribuir a un mejor ambiente de trabajo.</p><p>Atentamente,<br><strong>Dirección de Recursos Humanos</strong></p>`,
    feedback: { verdict: 'legit', explanation: 'Este es un correo legítimo de Recursos Humanos. Proviene del dominio corporativo real, no hay urgencia, no pide datos sensibles y la acción solicitada (encuesta) es razonable.', signals: [{ t: 'Remitente corporativo real', d: '"rrhh@empresa.com" es el dominio oficial interno de la compañía.' }, { t: 'Sin presión ni amenaza', d: 'Se informa de un plazo razonable (31 de marzo) sin lenguaje alarmista.' }, { t: 'No solicita datos sensibles', d: 'Una encuesta de clima laboral no requiere datos bancarios, contraseñas ni información personal crítica.' }] }
  },
  {
    id: 9, type: 'sms', isPhishing: true,
    phone: '+52 1 800 226 2663', carrier: 'BBVA Bancomer', time: 'Hoy, 5:17 PM',
    body: `BBVA: Cargo no reconocido de $12,500 MXN en tu tarjeta terminación 8821. Si NO realizaste esta compra, cancela AHORA: <a href="#">bbva-seguridad.mx/cancelar</a> Clave temporal: 8821`,
    feedback: { verdict: 'phishing', explanation: 'BBVA nunca envía SMS con enlaces para cancelar transacciones. El dominio "bbva-seguridad.mx" no es oficial. La "clave temporal" es un truco para que el usuario ingrese ese dato en el sitio falso.', signals: [{ t: 'Enlace falso', d: 'El dominio oficial de BBVA es bbva.mx; "bbva-seguridad.mx" es un sitio clonado de phishing.' }, { t: '"Clave temporal" en el SMS', d: 'Incluir datos como "8821" busca que el usuario los ingrese en el sitio falso como credencial.' }, { t: 'Urgencia máxima', d: 'Palabras como "AHORA" en mayúsculas son técnicas clásicas de manipulación por pánico.' }] }
  },
  {
    id: 10, type: 'email', isPhishing: false,
    from: 'GitHub', addr: 'notifications@github.com',
    to: 'usuario@empresa.com', avatarLetter: 'G', avatarColor: '#212121',
    subject: '[empresa/proyecto] PR #47: Fix: validación de formulario en módulo de pagos', time: 'Hoy, 12:05 PM',
    body: `<p><strong>carlos.mendoza</strong> abrió un Pull Request en <strong>empresa/proyecto</strong>:</p><p><strong>Fix: validación de formulario en módulo de pagos (#47)</strong></p><p>Corrección de error donde el campo "monto" aceptaba valores negativos. Incluye pruebas unitarias.</p><ul style="padding-left:20px; color:#333; font-size:.9rem;"><li>2 archivos modificados</li><li>+38 líneas añadidas / -12 eliminadas</li></ul><p><a href="#">Ver Pull Request en GitHub →</a></p><br><small style="color:#aaa">Recibes esto porque participas en este repositorio. <a href="#">Unsubscribe</a></small>`,
    feedback: { verdict: 'legit', explanation: 'Esta es una notificación estándar de GitHub. El remitente es el dominio oficial notifications@github.com y el contenido es técnico, sin solicitudes de datos ni urgencia.', signals: [{ t: 'Dominio oficial verificado', d: '"notifications@github.com" es el remitente legítimo de GitHub para notificaciones.' }, { t: 'Contenido técnico coherente', d: 'Los detalles del PR (archivos, líneas, nombre de usuario) son consistentes y no alarman.' }, { t: 'Opción de darse de baja', d: 'Los correos legítimos siempre incluyen opción de unsubscribe; el phishing rara vez lo hace.' }] }
  }
];

// ════════════════════════════════════════════════════════
//  CONSTANTS & STATE
// ════════════════════════════════════════════════════════
const TOTAL_PHISHING = SCENARIOS.filter(s => s.isPhishing).length; // 6

let currentIndex          = 0;
let score                 = 0;
let correctCount          = 0;
let partialCount          = 0;
let wrongCount            = 0;
let userAlias             = 'Anónimo';
let sessionId             = null;
let scenarioStartTime     = null;
let dwellTimes            = [];
let phishingFellCount     = 0;
let phishingReportedCount = 0;
let fellForScenarioIds    = [];

// ════════════════════════════════════════════════════════
//  START
// ════════════════════════════════════════════════════════
document.getElementById('btn-start').addEventListener('click', function () {
  const alias = document.getElementById('alias-input').value.trim();
  userAlias = alias || 'Anónimo';
  sessionId = Date.now();
  document.getElementById('consent-screen').style.display = 'none';
  document.getElementById('quiz-main').style.display = 'block';
  renderScenario(0);
});

// ════════════════════════════════════════════════════════
//  RENDER SCENARIO
// ════════════════════════════════════════════════════════
function renderScenario(idx) {
  scenarioStartTime = Date.now();
  const s = SCENARIOS[idx];
  document.getElementById('progress-fill').style.width = ((idx / SCENARIOS.length) * 100) + '%';
  const area = document.getElementById('email-layout-area');

  if (s.type === 'email') {
    area.innerHTML = `
      <div class="email-sidebar">
        <div class="sidebar-item active"><span class="si-icon">✉️</span> Bandeja de entrada</div>
        <div class="sidebar-item"><span class="si-icon">🕐</span> Pospuestos</div>
        <div class="sidebar-item"><span class="si-icon">📤</span> Enviados</div>
      </div>
      <div class="email-pane">
        <div class="email-meta-bar">
          <span>ESCENARIO</span><span style="font-weight:900;font-size:.9rem;color:#1a237e;">${idx+1}</span><span>DE ${SCENARIOS.length}</span>
        </div>
        <div class="email-subject">${s.subject}</div>
        <div class="email-from-row">
          <div class="avatar-circle" style="background:${s.avatarColor}">${s.avatarLetter}</div>
          <div class="email-from-info">
            <div class="email-from-name">${s.from} <span class="email-from-addr">&lt;${s.addr}&gt;</span></div>
            <div class="email-to">Para: mi &lt;${s.to}&gt;</div>
          </div>
          <div class="email-time">${s.time}</div>
        </div>
        <div class="email-body">${s.body}</div>
      </div>`;
  } else {
    area.innerHTML = `
      <div class="email-sidebar">
        <div class="sidebar-item active"><span class="si-icon">💬</span> Mensajes</div>
        <div class="sidebar-item"><span class="si-icon">📵</span> Bloqueados</div>
        <div class="sidebar-item"><span class="si-icon">⭐</span> Marcados</div>
      </div>
      <div class="email-pane">
        <div class="email-meta-bar">
          <span>ESCENARIO</span><span style="font-weight:900;font-size:.9rem;color:#1a237e;">${idx+1}</span><span>DE ${SCENARIOS.length}</span>
        </div>
        <div class="sms-layout">
          <div class="sms-header-info">
            <div class="sms-phone">${s.phone}</div>
            <div style="font-size:.78rem;color:#aaa;">${s.carrier || 'Número desconocido'}</div>
          </div>
          <div class="sms-bubble-wrap"><div class="sms-bubble">${s.body}</div></div>
          <div class="sms-time">${s.time}</div>
        </div>
      </div>`;
  }
}

// ════════════════════════════════════════════════════════
//  SUBMIT ANSWER
// ════════════════════════════════════════════════════════
function submitAnswer(answer) {
  dwellTimes.push(Date.now() - scenarioStartTime);
  const s = SCENARIOS[currentIndex];
  let pts = 0, verdictClass = 'wrong', verdictText = '', badgeClass = 'zero', badgeText = '+0 puntos';

  if (s.isPhishing) {
    if (answer === 'phishing') {
      pts = 1; verdictClass = 'correct'; verdictText = '¡Bien Visto! Identificado Correctamente.';
      badgeClass = 'full'; badgeText = '+1 punto'; correctCount++; phishingReportedCount++;
    } else if (answer === 'suspicious') {
      pts = 0.5; verdictClass = 'partial'; verdictText = '¡Buen instinto! Era Phishing, pero lo marcaste como Sospechoso.';
      badgeClass = 'half'; badgeText = '+0.5 puntos'; partialCount++; phishingReportedCount++;
    } else {
      pts = 0; verdictClass = 'wrong'; verdictText = '¡Cuidado! Este era un intento de Phishing.';
      badgeClass = 'zero'; badgeText = '+0 puntos'; wrongCount++; phishingFellCount++; fellForScenarioIds.push(s.id);
    }
  } else {
    if (answer === 'legit') {
      pts = 1; verdictClass = 'correct'; verdictText = '¡Correcto! Este mensaje era Legítimo.';
      badgeClass = 'full'; badgeText = '+1 punto'; correctCount++;
    } else {
      pts = 0; verdictClass = 'wrong';
      verdictText = answer === 'phishing' ? '¡Incorrecto! Este mensaje era perfectamente legítimo.' : '¡Incorrecto! Marcar un legítimo como sospechoso no suma puntos.';
      badgeClass = 'zero'; badgeText = '+0 puntos'; wrongCount++;
    }
  }
  score += pts;
  showFeedbackModal(s, verdictClass, verdictText, badgeClass, badgeText);
}

// ════════════════════════════════════════════════════════
//  METRICS
// ════════════════════════════════════════════════════════
function calcMetrics(finalScore) {
  const clickRate  = TOTAL_PHISHING > 0 ? phishingFellCount / TOTAL_PHISHING : 0;
  const reportRate = TOTAL_PHISHING > 0 ? phishingReportedCount / TOTAL_PHISHING : 0;
  const avgDwellMs = dwellTimes.length > 0
    ? Math.round(dwellTimes.reduce((a, b) => a + b, 0) / dwellTimes.length) : 0;

  // Risk Score 0–100 (higher = more dangerous user)
  let riskScore = Math.round((1 - finalScore / 10) * 65);
  if (avgDwellMs < 5000 && clickRate > 0)       riskScore += 22;
  else if (avgDwellMs < 5000)                   riskScore += 8;
  else if (avgDwellMs < 10000 && clickRate > 0) riskScore += 12;
  if (avgDwellMs > 25000)                       riskScore = Math.max(0, riskScore - 8);
  riskScore = Math.max(0, Math.min(100, riskScore));

  return { clickRate, reportRate, avgDwellMs, riskScore,
           dwellTimes: [...dwellTimes], phishingFellCount,
           phishingReportedCount, totalPhishing: TOTAL_PHISHING,
           fellForScenarioIds: [...fellForScenarioIds] };
}

// ════════════════════════════════════════════════════════
//  FEEDBACK MODAL
// ════════════════════════════════════════════════════════
function showFeedbackModal(s, verdictClass, verdictText, badgeClass, badgeText) {
  const fb = s.feedback;
  const signalsHTML = fb.signals.map(sig =>
    `<div class="modal-signal-item"><strong>${sig.t}:</strong> ${sig.d}</div>`).join('');
  const isLast    = currentIndex === SCENARIOS.length - 1;
  const nextLabel = isLast ? 'Ver mis resultados →' : 'Siguiente escenario →';
  document.getElementById('modal-overlay').innerHTML = `
    <div class="modal-overlay" id="modal-overlay-inner">
      <div class="modal-box">
        <div class="modal-verdict ${verdictClass}">
          <span class="modal-verdict-icon">${verdictClass==='correct'?'✅':verdictClass==='partial'?'🤔':'❌'}</span>
          <span>${verdictText}</span>
        </div>
        <div class="modal-body">
          <p class="modal-explanation">${fb.explanation}</p>
          <div class="modal-signals">
            <div class="modal-signals-title">Señales a tomar en cuenta:</div>
            ${signalsHTML}
          </div>
          <span class="modal-points-badge ${badgeClass}">${badgeText}</span>
        </div>
        <button class="btn-next" onclick="nextScenario()">${nextLabel}</button>
      </div>
    </div>`;
  document.getElementById('modal-overlay').style.display = 'block';
}

// ════════════════════════════════════════════════════════
//  NEXT SCENARIO
// ════════════════════════════════════════════════════════
function nextScenario() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.getElementById('modal-overlay').innerHTML = '';
  currentIndex++;
  currentIndex >= SCENARIOS.length ? showResults() : renderScenario(currentIndex);
}

// ════════════════════════════════════════════════════════
//  RESULTS SCREEN
// ════════════════════════════════════════════════════════
async function showResults() {
  document.getElementById('quiz-main').style.display = 'none';
  document.getElementById('results-screen').style.display = 'block';

  const finalScore = Math.round(score * 10) / 10;
  const metrics    = calcMetrics(finalScore);

  document.getElementById('score-display').textContent        = finalScore;
  document.getElementById('results-alias-label').textContent  = '👤 ' + userAlias;
  document.getElementById('rb-correct').textContent           = correctCount;
  document.getElementById('rb-partial').textContent           = partialCount;
  document.getElementById('rb-wrong').textContent             = wrongCount;

  const circumference = 351.86;
  setTimeout(() => {
    document.getElementById('score-arc').style.strokeDashoffset =
      circumference - (finalScore / 10) * circumference;
    const pct = finalScore / 10;
    document.getElementById('score-arc').style.stroke =
      pct >= 0.8 ? '#2e7d32' : pct >= 0.6 ? '#3949ab' : pct >= 0.4 ? '#f57f17' : '#c62828';
  }, 200);

  const gl = document.getElementById('grade-label');
  if      (finalScore >= 9) { gl.textContent = '🏆 Experto en ciberseguridad'; gl.className = 'grade-label grade-A'; }
  else if (finalScore >= 7) { gl.textContent = '👍 Buen ojo digital';          gl.className = 'grade-label grade-B'; }
  else if (finalScore >= 5) { gl.textContent = '⚠️ Necesitas más práctica';    gl.className = 'grade-label grade-C'; }
  else                      { gl.textContent = '🚨 Alto riesgo de engaño';     gl.className = 'grade-label grade-D'; }

  renderPersonalMetrics(metrics);
  await saveToLeaderboard(userAlias, finalScore, metrics);
  await renderResultsTop3();
  await renderGlobalLeaderboard();

  // Scroll to results
  document.getElementById('results-screen').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ════════════════════════════════════════════════════════
//  PERSONAL METRICS PANEL
// ════════════════════════════════════════════════════════
function renderPersonalMetrics(m) {
  const el = document.getElementById('personal-metrics-wrap');
  if (!el) return;
  const clickPct  = Math.round(m.clickRate * 100);
  const reportPct = Math.round(m.reportRate * 100);
  const avgSec    = (m.avgDwellMs / 1000).toFixed(1);
  const riskColor = m.riskScore <= 30 ? '#2e7d32' : m.riskScore <= 60 ? '#f57f17' : '#c62828';
  const riskLabel = m.riskScore <= 30 ? 'Bajo' : m.riskScore <= 60 ? 'Moderado' : 'Alto';
  const maxDwell  = Math.max(...m.dwellTimes, 1);

  const dwellBarsHTML = m.dwellTimes.map((t, i) => {
    const sc      = SCENARIOS[i];
    const fell    = sc.isPhishing && m.fellForScenarioIds.includes(sc.id);
    const barW    = Math.max(3, Math.round((t / maxDwell) * 100));
    const barColor= fell ? '#c62828' : t < 6000 ? '#f57f17' : '#3949ab';
    return `
      <div class="dwell-row">
        <span class="dwell-label">E${i+1}</span>
        <div class="dwell-bar-track">
          <div class="dwell-bar-fill" style="width:${barW}%;background:${barColor};"></div>
        </div>
        <span class="dwell-sec">${(t/1000).toFixed(1)}s</span>
        ${fell ? '<span class="dwell-fell">⚠️ cayó</span>' : ''}
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="pm-title">📊 Tus Métricas de Resiliencia</div>
    <div class="pm-grid">
      <div class="pm-card">
        <div class="pm-icon">🎣</div>
        <div class="pm-num" style="color:#c62828;">${clickPct}%</div>
        <div class="pm-label">Click Rate</div>
        <div class="pm-sub">Phishing que te engañó (${m.phishingFellCount}/${m.totalPhishing})</div>
      </div>
      <div class="pm-card">
        <div class="pm-icon">🚩</div>
        <div class="pm-num" style="color:#2e7d32;">${reportPct}%</div>
        <div class="pm-label">Tasa de Reporte</div>
        <div class="pm-sub">Phishing detectado (${m.phishingReportedCount}/${m.totalPhishing})</div>
      </div>
      <div class="pm-card">
        <div class="pm-icon">⚡</div>
        <div class="pm-num" style="color:${riskColor};">${m.riskScore}</div>
        <div class="pm-label">Risk Score</div>
        <div class="pm-sub">Riesgo ${riskLabel} · score + tiempo</div>
      </div>
      <div class="pm-card">
        <div class="pm-icon">⏱️</div>
        <div class="pm-num" style="color:#3949ab;">${avgSec}s</div>
        <div class="pm-label">Dwell Time Prom.</div>
        <div class="pm-sub">Promedio por escenario</div>
      </div>
    </div>
    <div class="dwell-section">
      <div class="dwell-title">⏱️ Tiempo de permanencia por escenario</div>
      ${dwellBarsHTML}
      <div class="dwell-legend">
        <span class="dl-dot" style="background:#c62828;"></span> Cayó en phishing &nbsp;&nbsp;
        <span class="dl-dot" style="background:#f57f17;"></span> Respuesta rápida (&lt;6s) &nbsp;&nbsp;
        <span class="dl-dot" style="background:#3949ab;"></span> Lectura normal
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════
//  RESULTS TOP-3 MINI LEADERBOARD
// ════════════════════════════════════════════════════════
async function renderResultsTop3() {
  const tbody = document.getElementById('results-top3-body');
  if (!tbody) return;
  const top3   = (await getLeaderboard()).slice(0, 3);
  const medals = ['🥇', '🥈', '🥉'];
  if (!top3.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#aaa;">Sin registros aún.</td></tr>';
    return;
  }
  tbody.innerHTML = top3.map((e, i) => {
    const isCurrent = e.sid === sessionId;
    const riskColor = e.riskScore <= 30 ? '#2e7d32' : e.riskScore <= 60 ? '#f57f17' : '#c62828';
    return `<tr class="${isCurrent ? 'current-user' : ''}">
      <td>${medals[i]}</td>
      <td>${e.alias}${isCurrent ? ' <span class="lb-you">← tú</span>' : ''}</td>
      <td><strong>${e.pts}</strong>/10</td>
      <td>${Math.round((e.clickRate||0)*100)}%</td>
      <td style="color:${riskColor};font-weight:700;">${e.riskScore ?? '—'}</td>
    </tr>`;
  }).join('');
}

// ════════════════════════════════════════════════════════
//  LEADERBOARD — Firebase Realtime Database (REST API)
//  ► Reemplaza YOUR_PROJECT_ID con el ID de tu proyecto Firebase
// ════════════════════════════════════════════════════════
const FB_URL = 'https://cybersec-test-results-default-rtdb.firebaseio.com/leaderboard';

async function saveToLeaderboard(alias, pts, metrics) {
  const entry = {
    alias, pts,
    date: new Date().toLocaleDateString('es-MX'),
    sid: sessionId,
    clickRate: metrics.clickRate,
    reportRate: metrics.reportRate,
    riskScore: metrics.riskScore,
    avgDwellMs: metrics.avgDwellMs,
    phishingFellCount: metrics.phishingFellCount,
    phishingReportedCount: metrics.phishingReportedCount,
    totalPhishing: metrics.totalPhishing,
    fellForScenarioIds: metrics.fellForScenarioIds,
    timestamp: Date.now()
  };
  try {
    const res = await fetch(FB_URL + '.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
    if (!res.ok) console.error('Firebase save error:', res.status);
  } catch (e) {
    console.error('Error guardando en leaderboard:', e);
  }
}

async function getLeaderboard() {
  try {
    const res = await fetch(FB_URL + '.json');
    const data = await res.json();
    if (!data) return [];
    const lb = Object.values(data);
    lb.sort((a, b) => b.pts - a.pts || (a.riskScore ?? 99) - (b.riskScore ?? 99));
    return lb.slice(0, 50);
  } catch (e) {
    console.error('Error cargando leaderboard:', e);
    return [];
  }
}

// ════════════════════════════════════════════════════════
//  GLOBAL LEADERBOARD SECTION
// ════════════════════════════════════════════════════════
async function renderGlobalLeaderboard() {
  const lb = await getLeaderboard();
  renderGlobalStats(lb);

  const tbody = document.getElementById('global-lb-body');
  if (!tbody) return;
  if (!lb.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#aaa;padding:20px;">Sin registros aún. ¡Completa el quiz para aparecer aquí!</td></tr>';
    return;
  }
  const medals = { 0: '🥇', 1: '🥈', 2: '🥉' };
  tbody.innerHTML = lb.map((e, i) => {
    const isCurrent = e.sid === sessionId;
    const riskScore = e.riskScore ?? null;
    const riskColor = riskScore === null ? '#aaa' : riskScore <= 30 ? '#2e7d32' : riskScore <= 60 ? '#f57f17' : '#c62828';
    const riskLabel = riskScore === null ? '—' : riskScore <= 30 ? 'Bajo' : riskScore <= 60 ? 'Mod.' : 'Alto';
    return `<tr class="${isCurrent ? 'current-user' : ''}">
      <td class="lb-rank">${medals[i] || (i+1)}</td>
      <td class="lb-alias">${e.alias}${isCurrent ? ' <span class="lb-you">← tú</span>' : ''}</td>
      <td class="lb-score"><strong>${e.pts}</strong><span class="lb-of">/10</span></td>
      <td class="lb-metric click">${e.clickRate != null ? Math.round(e.clickRate*100)+'%' : '—'}</td>
      <td class="lb-metric report">${e.reportRate != null ? Math.round(e.reportRate*100)+'%' : '—'}</td>
      <td class="lb-metric risk" style="color:${riskColor};font-weight:700;">${riskScore ?? '—'} <span class="risk-tag">${riskLabel}</span></td>
      <td class="lb-metric dwell">${e.avgDwellMs ? (e.avgDwellMs/1000).toFixed(1)+'s' : '—'}</td>
      <td class="lb-date">${e.date}</td>
    </tr>`;
  }).join('');
}

function renderGlobalStats(lb) {
  const el = document.getElementById('global-stats-bar');
  if (!el) return;
  if (!lb.length) {
    el.innerHTML = '<div class="gstat-empty">Completa el quiz para ver estadísticas globales.</div>';
    return;
  }
  const n        = lb.length;
  const avgScore = (lb.reduce((a, e) => a + e.pts, 0) / n).toFixed(1);
  const withClick = lb.filter(e => e.clickRate != null);
  const avgClick = withClick.length ? Math.round(withClick.reduce((a,e)=>a+e.clickRate,0)/withClick.length*100) : null;
  const withRep  = lb.filter(e => e.reportRate != null);
  const avgReport= withRep.length ? Math.round(withRep.reduce((a,e)=>a+e.reportRate,0)/withRep.length*100) : null;
  const fell1plus= lb.filter(e => (e.phishingFellCount||0) > 0).length;
  const pctFell  = Math.round((fell1plus / n) * 100);
  // Most dangerous scenario
  const counts   = {};
  lb.forEach(e => (e.fellForScenarioIds||[]).forEach(id => { counts[id] = (counts[id]||0)+1; }));
  const topId    = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];
  const topCount = topId ? counts[topId] : 0;

  el.innerHTML = `
    <div class="gstat-card">
      <div class="gstat-num">${n}</div>
      <div class="gstat-label">Participantes</div>
    </div>
    <div class="gstat-card">
      <div class="gstat-num">${avgScore}<span class="gstat-unit">/10</span></div>
      <div class="gstat-label">Score Promedio Global</div>
    </div>
    <div class="gstat-card danger">
      <div class="gstat-num" style="color:#c62828;">${pctFell}%</div>
      <div class="gstat-label">Cayeron en ≥1 Phishing</div>
    </div>
    <div class="gstat-card">
      <div class="gstat-num" style="color:#c62828;">${avgClick != null ? avgClick+'%' : '—'}</div>
      <div class="gstat-label">Click Rate Global</div>
    </div>
    <div class="gstat-card">
      <div class="gstat-num" style="color:#2e7d32;">${avgReport != null ? avgReport+'%' : '—'}</div>
      <div class="gstat-label">Tasa de Reporte Global</div>
    </div>
    <div class="gstat-card warning">
      <div class="gstat-num" style="color:#f57f17; ">${topId ? 'Escenario '+topId : '—'}</div>
      <div class="gstat-label">Escenario más peligroso (${topCount} caídas)</div>
    </div>`;
}

function clearLeaderboard() {
  alert('El leaderboard ahora está en Firebase. Para borrarlo, hazlo directamente desde la consola de Firebase.');
}

// ════════════════════════════════════════════════════════
//  RETRY
// ════════════════════════════════════════════════════════
function retryQuiz() {
  currentIndex = 0; score = 0; correctCount = 0; partialCount = 0; wrongCount = 0;
  sessionId = null; phishingFellCount = 0; phishingReportedCount = 0;
  dwellTimes = []; fellForScenarioIds = [];
  document.getElementById('results-screen').style.display = 'none';
  document.getElementById('consent-screen').style.display = 'block';
  document.getElementById('alias-input').value = '';
  document.getElementById('progress-fill').style.width = '0%';
}

// ════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async function () {
  await renderGlobalLeaderboard();
});
