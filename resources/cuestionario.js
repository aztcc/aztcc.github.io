// ════════════════════════════════════════════════════════
//  SCENARIOS  (10 total: 6 phishing, 4 legítimo)
// ════════════════════════════════════════════════════════
const SCENARIOS = [
  // ── 1 ── PHISHING: payroll urgency
  {
    id: 1, type: 'email', isPhishing: true,
    from: 'Recursos Humanos', addr: 'rrhh@empresa-portal.com',
    to: 'usuario@empresa.com', avatarLetter: 'R', avatarColor: '#3949ab',
    subject: 'URGENTE: Actualización obligatoria de nómina',
    time: 'Hoy, 08:15 AM',
    body: `<p>Estimado empleado,</p>
<p>Hemos detectado un <strong>error en el procesamiento</strong> de tu cuenta de nómina para el próximo pago.
Si no actualizas tu información bancaria en las próximas <strong>2 horas</strong>, tu salario podría ser retenido.</p>
<p>Por favor, ingresa al portal de empleados <strong>inmediatamente</strong> para verificar tus datos:</p>
<a href="#" class="btn-link-fake">Actualizar datos bancarios ahora →</a>
<br><br><small style="color:#aaa">Este mensaje fue enviado de manera automática. No respondas a este correo.</small>`,
    feedback: {
      verdict: 'phishing',
      explanation: 'Este correo utilizaba tácticas de urgencia extrema y una dirección de dominio falsa (@empresa-portal.com en lugar del dominio corporativo real).',
      signals: [
        { t: 'Dirección sospechosa', d: 'El dominio real de RRHH no suele ser "empresa-portal.com"; pertenece a un tercero.' },
        { t: 'Sentido de urgencia extrema', d: 'Amenaza con retener el salario en 2 horas para forzar una acción rápida e impulsiva.' },
        { t: 'Enlace falso', d: 'El enlace no dirige a un portal interno conocido; lleva a un sitio de captura de datos.' }
      ]
    }
  },

  // ── 2 ── PHISHING: fake bank alert
  {
    id: 2, type: 'email', isPhishing: true,
    from: 'Banamex Seguridad', addr: 'alertas@banamex-secure.net',
    to: 'usuario@correo.com', avatarLetter: 'B', avatarColor: '#c62828',
    subject: '⚠️ Actividad inusual detectada en tu cuenta',
    time: 'Hoy, 11:42 AM',
    body: `<p>Estimado cliente,</p>
<p>Hemos detectado un acceso no autorizado a tu cuenta desde una ubicación desconocida (<strong>IP: 185.220.101.47, Rusia</strong>).</p>
<p>Para proteger tu dinero, tu cuenta ha sido <strong>temporalmente suspendida</strong>. Debes verificar tu identidad en las próximas <strong>24 horas</strong> o se cancelará permanentemente.</p>
<a href="#" class="btn-link-fake">Verificar identidad y reactivar cuenta →</a>
<br><br><small style="color:#aaa">Banamex — Protegiendo tu patrimonio desde 1884.</small>`,
    feedback: {
      verdict: 'phishing',
      explanation: 'Los bancos reales nunca piden que "verifiques tu identidad" a través de un enlace en correo. Además, el dominio es falso.',
      signals: [
        { t: 'Dominio no oficial', d: '"banamex-secure.net" no es el dominio real del banco; el oficial es banamex.com.' },
        { t: 'IP inventada para asustar', d: 'Mostrar una IP extranjera busca generar pánico inmediato en el usuario.' },
        { t: 'Amenaza de cancelación', d: 'Los bancos no cancelan cuentas por no hacer clic en un correo; es presión psicológica.' }
      ]
    }
  },

  // ── 3 ── LEGÍTIMO: calendar invite
  {
    id: 3, type: 'email', isPhishing: false,
    from: 'Google Calendar', addr: 'calendar-notification@google.com',
    to: 'usuario@empresa.com', avatarLetter: 'G', avatarColor: '#4caf50',
    subject: 'Invitación: Reunión semanal de equipo — Viernes 10:00 AM',
    time: 'Ayer, 04:50 PM',
    body: `<p>Has recibido una invitación de <strong>Ana García (ana.garcia@empresa.com)</strong>:</p>
<p><strong>📅 Reunión semanal de equipo</strong><br>
Viernes, 21 de marzo · 10:00 – 11:00 AM<br>
Enlace de Google Meet: meet.google.com/abc-defg-hij</p>
<p>Agenda: Revisión de avances Q1, planeación de sprint 14.</p>
<p>Confirmación: <a href="#">Aceptar</a> · <a href="#">Rechazar</a> · <a href="#">Quizás</a></p>
<br><small style="color:#aaa">Enviado por Google Calendar en nombre de ana.garcia@empresa.com</small>`,
    feedback: {
      verdict: 'legit',
      explanation: 'Esta es una notificación legítima de Google Calendar. El remitente proviene de un dominio oficial de Google y la invitación contiene información interna coherente.',
      signals: [
        { t: 'Dominio oficial', d: '"calendar-notification@google.com" es un remitente válido y conocido de Google.' },
        { t: 'Sin urgencia ni amenaza', d: 'No hay presión de tiempo, amenazas ni solicitudes de datos sensibles.' },
        { t: 'Información consistente', d: 'El remitente interno (ana.garcia@empresa.com) y los detalles de la reunión son coherentes.' }
      ]
    }
  },

  // ── 4 ── PHISHING: Netflix suspension
  {
    id: 4, type: 'email', isPhishing: true,
    from: 'Netflix', addr: 'no-reply@netflix-support-mx.com',
    to: 'usuario@correo.com', avatarLetter: 'N', avatarColor: '#e53935',
    subject: 'Tu cuenta de Netflix ha sido suspendida',
    time: 'Hoy, 07:30 AM',
    body: `<p>Hola,</p>
<p>Hemos tenido problemas para procesar tu pago más reciente. Tu cuenta ha sido <strong>suspendida temporalmente</strong>.</p>
<p>Para evitar la cancelación definitiva de tu suscripción y perder tus listas y perfiles, actualiza tu método de pago en las próximas <strong>48 horas</strong>.</p>
<a href="#" class="btn-link-fake" style="background:#e53935;">Actualizar método de pago →</a>
<br><br><small style="color:#aaa">© 2024 Netflix, Inc. · 100 Winchester Circle, Los Gatos, CA</small>`,
    feedback: {
      verdict: 'phishing',
      explanation: 'El dominio del remitente es falso. Netflix siempre envía desde @netflix.com, nunca desde "netflix-support-mx.com".',
      signals: [
        { t: 'Dominio falso', d: '"netflix-support-mx.com" imita a Netflix pero no es su dominio oficial (@netflix.com).' },
        { t: 'Urgencia fabricada', d: 'Las 48 horas de plazo buscan que actúes antes de revisar si el correo es real.' },
        { t: 'Enlace de pago sospechoso', d: 'Netflix redirige al usuario dentro de su app o página oficial, no a través de botones en correos.' }
      ]
    }
  },

  // ── 5 ── PHISHING: SAT refund
  {
    id: 5, type: 'email', isPhishing: true,
    from: 'SAT México — Devoluciones', addr: 'devoluciones@sat-fiscal.org',
    to: 'contribuyente@correo.com', avatarLetter: 'S', avatarColor: '#1565c0',
    subject: 'Tienes una devolución fiscal pendiente de $4,280 MXN',
    time: 'Hoy, 09:15 AM',
    body: `<p>Estimado contribuyente,</p>
<p>El Servicio de Administración Tributaria (SAT) ha determinado que tienes derecho a una <strong>devolución fiscal de $4,280.00 MXN</strong> correspondiente al ejercicio fiscal 2023.</p>
<p>Para recibir tu devolución, deberás proporcionar tus datos bancarios actualizados a través del portal seguro en un plazo no mayor a <strong>72 horas</strong>:</p>
<a href="#" class="btn-link-fake" style="background:#1565c0;">Solicitar mi devolución →</a>
<br><br><small style="color:#aaa">SAT México · Av. Hidalgo 77, Col. Guerrero, CDMX</small>`,
    feedback: {
      verdict: 'phishing',
      explanation: 'El SAT real utiliza el dominio @sat.gob.mx. Ninguna institución de gobierno mexicana opera desde dominios .org privados para devoluciones.',
      signals: [
        { t: 'Dominio gubernamental falso', d: 'El dominio oficial del SAT es sat.gob.mx. El correo proviene de "sat-fiscal.org", un dominio privado.' },
        { t: 'Devolución no solicitada', d: 'Las devoluciones del SAT son tramitadas por el contribuyente desde el portal oficial, no notificadas por correo.' },
        { t: 'Solicita datos bancarios', d: 'Pedir datos bancarios por correo es una señal de alerta crítica en cualquier contexto.' }
      ]
    }
  },

  // ── 6 ── LEGÍTIMO: IT maintenance notice
  {
    id: 6, type: 'email', isPhishing: false,
    from: 'Soporte TI — Empresa', addr: 'ti-soporte@empresa.com',
    to: 'todos@empresa.com', avatarLetter: 'T', avatarColor: '#607d8b',
    subject: 'Mantenimiento programado del servidor — Sábado 01:00–04:00 AM',
    time: 'Lunes, 03:10 PM',
    body: `<p>Equipo,</p>
<p>Les informamos que el próximo <strong>sábado 22 de marzo</strong> se realizará mantenimiento preventivo en los servidores corporativos entre las <strong>01:00 y las 04:00 AM</strong>.</p>
<p>Durante ese período, los siguientes servicios estarán sin disponibilidad:</p>
<ul style="padding-left:20px; color:#333;">
  <li>VPN corporativa</li>
  <li>Correo electrónico (Outlook Web)</li>
  <li>SharePoint / OneDrive</li>
</ul>
<p>No es necesario realizar ninguna acción de tu parte. Si tienes dudas, contáctanos en la extensión <strong>1234</strong>.</p>
<p>Atentamente,<br><strong>Equipo de Soporte TI</strong></p>`,
    feedback: {
      verdict: 'legit',
      explanation: 'Esta es una comunicación interna legítima del área de TI. No solicita datos, no hay urgencia y proviene del dominio corporativo oficial.',
      signals: [
        { t: 'Dominio corporativo real', d: '"ti-soporte@empresa.com" es un remitente interno esperado y coherente.' },
        { t: 'Sin solicitud de acción urgente', d: 'El correo no pide clic en ningún enlace ni datos personales.' },
        { t: 'Información operativa normal', d: 'Los avisos de mantenimiento programado son comunicaciones estándar del área de TI.' }
      ]
    }
  },

  // ── 7 ── PHISHING SMS: package delivery
  {
    id: 7, type: 'sms', isPhishing: true,
    phone: '+52 1 800 555 7823', carrier: 'DHL Express MX',
    time: 'Hoy, 2:34 PM',
    body: `Tu paquete DHL #MX9284710 NO pudo ser entregado hoy por dirección incorrecta. Confirma tu domicilio en las próximas 12h o será devuelto: <a href="#">https://dhl-mx-entrega.xyz/confirmar</a>`,
    feedback: {
      verdict: 'phishing',
      explanation: 'Este SMS es un intento de smishing (phishing por SMS). El enlace lleva a un dominio falso que imita a DHL para robar datos personales o de tarjeta.',
      signals: [
        { t: 'Dominio de enlace falso', d: '"dhl-mx-entrega.xyz" no es el dominio oficial de DHL (dhl.com); el TLD ".xyz" es señal de alerta.' },
        { t: 'Sin número de rastreo verificable', d: 'Los números de guía DHL tienen formato estándar; este parece generado aleatoriamente.' },
        { t: 'Urgencia de 12 horas', d: 'La presión de tiempo busca que actúes impulsivamente sin verificar el mensaje.' }
      ]
    }
  },

  // ── 8 ── LEGÍTIMO: HR survey
  {
    id: 8, type: 'email', isPhishing: false,
    from: 'Recursos Humanos', addr: 'rrhh@empresa.com',
    to: 'usuario@empresa.com', avatarLetter: 'R', avatarColor: '#9c27b0',
    subject: 'Encuesta de clima laboral 2024 — Tu opinión importa',
    time: 'Ayer, 10:00 AM',
    body: `<p>Hola,</p>
<p>Como parte de nuestra iniciativa anual de <strong>bienestar organizacional</strong>, te invitamos a responder la encuesta de clima laboral 2024.</p>
<p>La encuesta es completamente <strong>anónima</strong>, tarda aproximadamente <strong>10 minutos</strong> y estará disponible hasta el <strong>31 de marzo</strong>.</p>
<p><a href="#">👉 Acceder a la encuesta</a></p>
<p>Gracias por contribuir a un mejor ambiente de trabajo.</p>
<p>Atentamente,<br><strong>Dirección de Recursos Humanos</strong></p>`,
    feedback: {
      verdict: 'legit',
      explanation: 'Este es un correo legítimo de Recursos Humanos. Proviene del dominio corporativo real, no hay urgencia, no pide datos sensibles y la acción solicitada (encuesta) es razonable.',
      signals: [
        { t: 'Remitente corporativo real', d: '"rrhh@empresa.com" es el dominio oficial interno de la compañía.' },
        { t: 'Sin presión ni amenaza', d: 'Se informa de un plazo razonable (31 de marzo) sin lenguaje alarmista.' },
        { t: 'No solicita datos sensibles', d: 'Una encuesta de clima laboral no requiere datos bancarios, contraseñas ni información personal crítica.' }
      ]
    }
  },

  // ── 9 ── PHISHING SMS: BBVA charge
  {
    id: 9, type: 'sms', isPhishing: true,
    phone: '+52 1 800 226 2663', carrier: 'BBVA Bancomer',
    time: 'Hoy, 5:17 PM',
    body: `BBVA: Cargo no reconocido de $12,500 MXN en tu tarjeta terminación 8821. Si NO realizaste esta compra, cancela AHORA: <a href="#">bbva-seguridad.mx/cancelar</a> Clave temporal: 8821`,
    feedback: {
      verdict: 'phishing',
      explanation: 'BBVA nunca envía SMS con enlaces para cancelar transacciones. El dominio "bbva-seguridad.mx" no es oficial. La "clave temporal" es un truco para que el usuario ingrese ese dato en el sitio falso.',
      signals: [
        { t: 'Enlace falso', d: 'El dominio oficial de BBVA es bbva.mx; "bbva-seguridad.mx" es un sitio clonado de phishing.' },
        { t: '"Clave temporal" en el SMS', d: 'Incluir datos como "8821" busca que el usuario los ingrese en el sitio falso como credencial.' },
        { t: 'Urgencia máxima', d: 'Palabras como "AHORA" en mayúsculas son técnicas clásicas de manipulación por pánico.' }
      ]
    }
  },

  // ── 10 ── LEGÍTIMO: GitHub PR notification
  {
    id: 10, type: 'email', isPhishing: false,
    from: 'GitHub', addr: 'notifications@github.com',
    to: 'usuario@empresa.com', avatarLetter: 'G', avatarColor: '#212121',
    subject: '[empresa/proyecto] PR #47: Fix: validación de formulario en módulo de pagos',
    time: 'Hoy, 12:05 PM',
    body: `<p><strong>carlos.mendoza</strong> abrió un Pull Request en <strong>empresa/proyecto</strong>:</p>
<p><strong>Fix: validación de formulario en módulo de pagos (#47)</strong></p>
<p>Corrección de error donde el campo "monto" aceptaba valores negativos. Incluye pruebas unitarias.</p>
<ul style="padding-left:20px; color:#333; font-size:1.4rem;">
  <li>2 archivos modificados</li>
  <li>+38 líneas añadidas / -12 eliminadas</li>
</ul>
<p><a href="#">Ver Pull Request en GitHub →</a></p>
<br><small style="color:#aaa">Recibes esto porque participas en este repositorio. <a href="#">Unsubscribe</a></small>`,
    feedback: {
      verdict: 'legit',
      explanation: 'Esta es una notificación estándar de GitHub. El remitente es el dominio oficial notifications@github.com y el contenido es técnico, sin solicitudes de datos ni urgencia.',
      signals: [
        { t: 'Dominio oficial verificado', d: '"notifications@github.com" es el remitente legítimo de GitHub para notificaciones.' },
        { t: 'Contenido técnico coherente', d: 'Los detalles del PR (archivos, líneas, nombre de usuario) son consistentes y no alarman.' },
        { t: 'Opción de darse de baja', d: 'Los correos legítimos siempre incluyen opción de unsubscribe; el phishing rara vez lo hace.' }
      ]
    }
  }
];

// ════════════════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════════════════
let currentIndex = 0;
let score = 0;
let correctCount = 0;
let partialCount = 0;
let wrongCount = 0;
let userAlias = 'Anónimo';
let sessionId = null;

// ════════════════════════════════════════════════════════
//  START
// ════════════════════════════════════════════════════════
document.getElementById('btn-start').addEventListener('click', function() {
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
  const s = SCENARIOS[idx];
  const progress = ((idx) / SCENARIOS.length) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';

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
          <span>ESCENARIO</span><span style="font-weight:900; font-size:.9rem; color:#1a237e;">${idx+1}</span><span>DE ${SCENARIOS.length}</span>
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
      </div>
    `;
  } else {
    // SMS layout
    area.innerHTML = `
      <div class="email-sidebar">
        <div class="sidebar-item active"><span class="si-icon">💬</span> Mensajes</div>
        <div class="sidebar-item"><span class="si-icon">📵</span> Bloqueados</div>
        <div class="sidebar-item"><span class="si-icon">⭐</span> Marcados</div>
      </div>
      <div class="email-pane">
        <div class="email-meta-bar">
          <span>ESCENARIO</span><span style="font-weight:900; font-size:.9rem; color:#1a237e;">${idx+1}</span><span>DE ${SCENARIOS.length}</span>
        </div>
        <div class="sms-layout">
          <div class="sms-header-info">
            <div class="sms-phone">${s.phone}</div>
            <div style="font-size:1.5rem; color:#aaa;">${s.carrier || 'Número desconocido'}</div>
          </div>
          <div class="sms-bubble-wrap">
            <div class="sms-bubble">${s.body}</div>
          </div>
          <div class="sms-time">${s.time}</div>
        </div>
      </div>
    `;
  }
}

// ════════════════════════════════════════════════════════
//  SUBMIT ANSWER
// ════════════════════════════════════════════════════════
function submitAnswer(answer) {
  const s = SCENARIOS[currentIndex];
  let pts = 0;
  let verdictClass = 'wrong';
  let verdictText = '';
  let badgeClass = 'zero';
  let badgeText = '+0 puntos';

  if (s.isPhishing) {
    if (answer === 'phishing') {
      pts = 1; verdictClass = 'correct';
      verdictText = '¡Bien Visto! Identificado Correctamente.';
      badgeClass = 'full'; badgeText = '+1 punto'; correctCount++;
    } else if (answer === 'suspicious') {
      pts = 0.5; verdictClass = 'partial';
      verdictText = '¡Buen instinto! Era Phishing, pero lo marcaste como Sospechoso.';
      badgeClass = 'half'; badgeText = '+0.5 puntos'; partialCount++;
    } else {
      pts = 0; verdictClass = 'wrong';
      verdictText = '¡Cuidado! Este era un intento de Phishing.';
      badgeClass = 'zero'; badgeText = '+0 puntos'; wrongCount++;
    }
  } else {
    // Legítimo
    if (answer === 'legit') {
      pts = 1; verdictClass = 'correct';
      verdictText = '¡Correcto! Este mensaje era Legítimo.';
      badgeClass = 'full'; badgeText = '+1 punto'; correctCount++;
    } else {
      pts = 0; verdictClass = 'wrong';
      verdictText = answer === 'phishing'
        ? '¡Incorrecto! Este mensaje era perfectamente legítimo.'
        : '¡Incorrecto! Marcar un legítimo como sospechoso no suma puntos.';
      badgeClass = 'zero'; badgeText = '+0 puntos'; wrongCount++;
    }
  }

  score += pts;
  showFeedbackModal(s, verdictClass, verdictText, badgeClass, badgeText);
}

// ════════════════════════════════════════════════════════
//  FEEDBACK MODAL
// ════════════════════════════════════════════════════════
function showFeedbackModal(s, verdictClass, verdictText, badgeClass, badgeText) {
  const fb = s.feedback;
  const signalsHTML = fb.signals.map(sig =>
    `<div class="modal-signal-item"><strong>${sig.t}:</strong> ${sig.d}</div>`
  ).join('');

  const isLast = (currentIndex === SCENARIOS.length - 1);
  const nextLabel = isLast ? 'Ver mis resultados →' : 'Siguiente escenario →';

  const html = `
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
    </div>
  `;

  const overlay = document.getElementById('modal-overlay');
  overlay.innerHTML = html;
  overlay.style.display = 'block';
}

// ════════════════════════════════════════════════════════
//  NEXT SCENARIO
// ════════════════════════════════════════════════════════
function nextScenario() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.getElementById('modal-overlay').innerHTML = '';
  currentIndex++;

  if (currentIndex >= SCENARIOS.length) {
    showResults();
  } else {
    renderScenario(currentIndex);
  }
}

// ════════════════════════════════════════════════════════
//  RESULTS SCREEN
// ════════════════════════════════════════════════════════
function showResults() {
  document.getElementById('quiz-main').style.display = 'none';
  document.getElementById('results-screen').style.display = 'block';

  // Score display
  const finalScore = Math.round(score * 10) / 10;
  document.getElementById('score-display').textContent = finalScore;
  document.getElementById('results-alias-label').textContent = '👤 ' + userAlias;
  document.getElementById('rb-correct').textContent = correctCount;
  document.getElementById('rb-partial').textContent = partialCount;
  document.getElementById('rb-wrong').textContent = wrongCount;

  // Arc animation
  const maxScore = 10;
  const circumference = 351.86;
  const offset = circumference - (finalScore / maxScore) * circumference;
  setTimeout(() => {
    document.getElementById('score-arc').style.strokeDashoffset = offset;
    const pct = finalScore / maxScore;
    document.getElementById('score-arc').style.stroke =
      pct >= 0.8 ? '#2e7d32' : pct >= 0.6 ? '#3949ab' : pct >= 0.4 ? '#f57f17' : '#c62828';
  }, 200);

  // Grade
  const gl = document.getElementById('grade-label');
  if (finalScore >= 9)      { gl.textContent = '🏆 Experto en ciberseguridad'; gl.className = 'grade-label grade-A'; }
  else if (finalScore >= 7) { gl.textContent = '👍 Buen ojo digital';          gl.className = 'grade-label grade-B'; }
  else if (finalScore >= 5) { gl.textContent = '⚠️ Necesitas más práctica';    gl.className = 'grade-label grade-C'; }
  else                       { gl.textContent = '🚨 Alto riesgo de engaño';     gl.className = 'grade-label grade-D'; }

  // Save to leaderboard
  saveToLeaderboard(userAlias, finalScore);
  renderLeaderboard();
}

// ════════════════════════════════════════════════════════
//  LEADERBOARD (localStorage)
// ════════════════════════════════════════════════════════
const LB_KEY = 'phishing_quiz_leaderboard_v1';

function saveToLeaderboard(alias, pts) {
  let lb = getLeaderboard();
  lb.push({ alias, pts, date: new Date().toLocaleDateString('es-MX'), sid: sessionId });
  lb.sort((a,b) => b.pts - a.pts);
  lb = lb.slice(0, 20); // keep top 20
  localStorage.setItem(LB_KEY, JSON.stringify(lb));
}

function getLeaderboard() {
  try { return JSON.parse(localStorage.getItem(LB_KEY)) || []; }
  catch(e) { return []; }
}

function renderLeaderboard() {
  const lb = getLeaderboard();
  const tbody = document.getElementById('leaderboard-body');
  if (!lb.length) { tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#aaa;">Sin registros aún.</td></tr>'; return; }
  tbody.innerHTML = lb.map((entry, i) => {
    const isCurrent = entry.sid === sessionId;
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
    return `<tr class="${isCurrent ? 'current-user' : ''} ${rankClass}">
      <td>${i+1}</td>
      <td>${entry.alias}${isCurrent ? ' <span style="font-size:.75rem;color:#f57f17;">← tú</span>' : ''}</td>
      <td>${entry.pts} / 10</td>
      <td>${entry.date}</td>
    </tr>`;
  }).join('');
}

function clearLeaderboard() {
  if (confirm('¿Seguro que deseas borrar todo el ranking?')) {
    localStorage.removeItem(LB_KEY);
    renderLeaderboard();
  }
}

// ════════════════════════════════════════════════════════
//  RETRY
// ════════════════════════════════════════════════════════
function retryQuiz() {
  currentIndex = 0; score = 0; correctCount = 0; partialCount = 0; wrongCount = 0; sessionId = null;
  document.getElementById('results-screen').style.display = 'none';
  document.getElementById('consent-screen').style.display = 'block';
  document.getElementById('alias-input').value = '';
  document.getElementById('progress-fill').style.width = '0%';
}