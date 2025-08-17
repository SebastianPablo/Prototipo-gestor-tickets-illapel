// ========================================
// DATOS DE USUARIOS PREDEFINIDOS
// ========================================
// Lista de usuarios con acceso al sistema
// En un entorno real, estos datos vendrían de una base de datos
const users = [
    {
        email: 'usuario1@illapel.cl',    // Email del primer funcionario
        password: '123456',              // Contraseña del funcionario
        name: 'Juan Pérez',              // Nombre completo del funcionario
        role: 'user'                     // Rol: usuario normal (funcionario)
    },
    {
        email: 'usuario2@illapel.cl',    // Email del segundo funcionario
        password: '123456',              // Contraseña del funcionario
        name: 'María González',          // Nombre completo del funcionario
        role: 'user'                     // Rol: usuario normal (funcionario)
    },
    {
        email: 'admin@illapel.cl',       // Email del administrador IT
        password: 'admin123',            // Contraseña del administrador
        name: 'Administrador IT',        // Nombre del administrador
        role: 'admin'                    // Rol: administrador del sistema
    }
];

// ========================================
// VARIABLES GLOBALES DEL SISTEMA
// ========================================
// Cargar datos guardados en el navegador o inicializar con valores por defecto
let tickets = JSON.parse(localStorage.getItem('tickets')) || [];        // Lista de todos los tickets del sistema
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;  // Usuario actualmente logueado
let chatUpdateInterval = null;                                          // Intervalo para actualización automática del chat

// ========================================
// FUNCIONES DE CONTROL DE FORMULARIOS DE LOGIN
// ========================================

/**
 * Muestra el formulario de login para usuarios funcionarios
 * Oculta el formulario de administrador
 */
function showUserLogin() {
    document.getElementById('userLoginForm').classList.remove('hidden');    // Mostrar formulario de usuario
    document.getElementById('adminLoginForm').classList.add('hidden');      // Ocultar formulario de admin
}

/**
 * Muestra el formulario de login para administradores
 * Oculta el formulario de usuario
 */
function showAdminLogin() {
    document.getElementById('adminLoginForm').classList.remove('hidden');   // Mostrar formulario de admin
    document.getElementById('userLoginForm').classList.add('hidden');       // Ocultar formulario de usuario
}

/**
 * Oculta ambos formularios de login
 * Vuelve a mostrar los botones de selección
 */
function hideLoginForms() {
    document.getElementById('userLoginForm').classList.add('hidden');       // Ocultar formulario de usuario
    document.getElementById('adminLoginForm').classList.add('hidden');      // Ocultar formulario de admin
}

/**
 * Función que maneja el login de usuarios funcionarios
 * Valida las credenciales y redirige al dashboard de usuario
 * @param {Event} event - Evento del formulario
 */
function loginUser(event) {
    event.preventDefault();  // Prevenir el envío normal del formulario
    
    // Obtener los valores ingresados por el usuario
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    
    // Buscar usuario que coincida con las credenciales y sea de tipo 'user'
    const user = users.find(u => u.email === email && u.password === password && u.role === 'user');
    
    if (user) {
        // Login exitoso
        currentUser = user;  // Guardar usuario en variable global
        localStorage.setItem('currentUser', JSON.stringify(currentUser));  // Guardar en navegador
        showUserDashboard();  // Mostrar panel de usuario
    } else {
        // Login fallido
        alert('Credenciales incorrectas');
    }
}

/**
 * Función que maneja el login de administradores
 * Valida las credenciales y redirige al dashboard de administrador
 * @param {Event} event - Evento del formulario
 */
function loginAdmin(event) {
    event.preventDefault();  // Prevenir el envío normal del formulario
    
    // Obtener los valores ingresados por el administrador
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    // Buscar usuario que coincida con las credenciales y sea de tipo 'admin'
    const user = users.find(u => u.email === email && u.password === password && u.role === 'admin');
    
    if (user) {
        // Login exitoso
        currentUser = user;  // Guardar usuario en variable global
        localStorage.setItem('currentUser', JSON.stringify(currentUser));  // Guardar en navegador
        showAdminDashboard();  // Mostrar panel de administrador
    } else {
        // Login fallido
        alert('Credenciales incorrectas');
    }
}

/**
 * Función para cerrar sesión del usuario actual
 * Limpia todos los datos de sesión y detiene la actualización del chat
 */
function logout() {
    currentUser = null;  // Limpiar usuario actual
    
    // Eliminar datos de sesión del navegador
    localStorage.removeItem('currentUser');
    
    // Detener la actualización automática del chat si está activa
    if (chatUpdateInterval) {
        clearInterval(chatUpdateInterval);
        chatUpdateInterval = null;
    }
    
    // Volver a la página de login
    showLoginPage();
}

// ========================================
// FUNCIONES DE NAVEGACIÓN Y DASHBOARDS
// ========================================

/**
 * Función que muestra la página principal de login
 * Crea toda la interfaz de login desde cero
 */
function showLoginPage() {
    document.body.innerHTML = `
        <div class="container">
            <div class="login-container">
                <div class="header">
                    <i class="fas fa-ticket-alt"></i>
                    <h1>Gestor de Tickets</h1>
                    <h2>Municipalidad de Illapel</h2>
                    <p>Sistema de Soporte Informático</p>
                </div>
                
                <div class="login-options">
                    <button class="login-btn user-btn" onclick="showUserLogin()">
                        <i class="fas fa-user"></i>
                        Acceso Usuario
                    </button>
                    <button class="login-btn admin-btn" onclick="showAdminLogin()">
                        <i class="fas fa-cog"></i>
                        Acceso Administrador
                    </button>
                </div>

                <div id="userLoginForm" class="login-form hidden">
                    <h3>Acceso de Usuario</h3>
                    <form onsubmit="loginUser(event)">
                        <div class="form-group">
                            <label for="userEmail">Email:</label>
                            <input type="email" id="userEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="userPassword">Contraseña:</label>
                            <input type="password" id="userPassword" required>
                        </div>
                        <button type="submit" class="submit-btn">Ingresar</button>
                    </form>
                    <button class="back-btn" onclick="hideLoginForms()">Volver</button>
                </div>

                <div id="adminLoginForm" class="login-form hidden">
                    <h3>Acceso de Administrador</h3>
                    <form onsubmit="loginAdmin(event)">
                        <div class="form-group">
                            <label for="adminEmail">Email:</label>
                            <input type="email" id="adminEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="adminPassword">Contraseña:</label>
                            <input type="password" id="adminPassword" required>
                        </div>
                        <button type="submit" class="submit-btn">Ingresar</button>
                    </form>
                    <button class="back-btn" onclick="hideLoginForms()">Volver</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Función que muestra el dashboard para usuarios funcionarios
 * Incluye formulario para crear tickets y lista de tickets del usuario
 */
function showUserDashboard() {
    // Filtrar solo los tickets del usuario actual
    const userTickets = tickets.filter(ticket => ticket.userEmail === currentUser.email);
    
    document.body.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>Panel de Usuario - ${currentUser.name}</h1>
                    <div class="user-info">
                        <span>Bienvenido, ${currentUser.name}</span>
                        <button class="logout-btn" onclick="logout()">Cerrar Sesión</button>
                    </div>
                </div>
                
                <div class="dashboard-content">
                    <div class="user-dashboard">
                        <div class="create-ticket-section">
                            <h2>Crear Nuevo Ticket</h2>
                            <form class="ticket-form" onsubmit="createTicket(event)">
                                <input type="text" id="ticketTitle" placeholder="Título del problema" required>
                                <textarea id="ticketDescription" placeholder="Describe detalladamente el problema..." required></textarea>
                                <button type="submit" class="create-ticket-btn">Crear Ticket</button>
                            </form>
                        </div>
                        
                        <div class="my-tickets-section">
                            <h2>Mis Tickets (${userTickets.length})</h2>
                            <div class="tickets-list">
                                ${userTickets.map(ticket => `
                                    <div class="ticket-card">
                                        <div class="ticket-header">
                                            <span class="ticket-title">${ticket.title}</span>
                                            <span class="ticket-status ${ticket.resolved ? 'status-resolved' : 'status-pending'}">
                                                ${ticket.resolved ? 'Resuelto' : 'Pendiente'}
                                            </span>
                                        </div>
                                        <div class="ticket-date">${new Date(ticket.date).toLocaleString('es-CL')}</div>
                                        <div class="ticket-description">${ticket.description.substring(0, 100)}${ticket.description.length > 100 ? '...' : ''}</div>
                                        <div class="ticket-actions">
                                            <button class="action-btn view-btn" onclick="viewTicketDetails('${ticket.id}')">Ver Detalles</button>
                                            <button class="action-btn chat-btn" onclick="openChat('${ticket.id}')">Chat</button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Función que muestra el dashboard para administradores
 * Incluye gestión de tickets pendientes y resueltos
 */
function showAdminDashboard() {
    // Separar tickets en pendientes y resueltos
    const pendingTickets = tickets.filter(ticket => !ticket.resolved);    // Tickets sin resolver
    const resolvedTickets = tickets.filter(ticket => ticket.resolved);    // Tickets resueltos
    
    document.body.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>Panel de Administrador - ${currentUser.name}</h1>
                    <div class="user-info">
                        <span>Administrador IT</span>
                        <button class="logout-btn" onclick="logout()">Cerrar Sesión</button>
                    </div>
                </div>
                
                <div class="dashboard-content">
                    <div class="admin-dashboard">
                        <div class="tickets-section">
                            <h2>Gestión de Tickets</h2>
                            <div class="tickets-grid">
                                <div class="tickets-column">
                                    <div class="column-header">
                                        <span class="column-title">Tickets Pendientes</span>
                                        <span class="ticket-count">${pendingTickets.length}</span>
                                    </div>
                                    ${pendingTickets.map(ticket => `
                                        <div class="admin-ticket-card">
                                            <div class="admin-ticket-header">
                                                <span class="admin-ticket-title">${ticket.title}</span>
                                                <span class="admin-ticket-user">${ticket.userName}</span>
                                            </div>
                                            <div class="admin-ticket-date">${new Date(ticket.date).toLocaleString('es-CL')}</div>
                                            <div class="admin-ticket-actions">
                                                <button class="admin-action-btn view-details-btn" onclick="viewTicketDetails('${ticket.id}')">Ver</button>
                                                <button class="admin-action-btn move-btn" onclick="moveTicket('${ticket.id}', true)">Marcar Resuelto</button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div class="tickets-column">
                                    <div class="column-header">
                                        <span class="column-title">Tickets Resueltos</span>
                                        <span class="ticket-count">${resolvedTickets.length}</span>
                                    </div>
                                    ${resolvedTickets.map(ticket => `
                                        <div class="admin-ticket-card resolved">
                                            <div class="admin-ticket-header">
                                                <span class="admin-ticket-title">${ticket.title}</span>
                                                <span class="admin-ticket-user">${ticket.userName}</span>
                                            </div>
                                            <div class="admin-ticket-date">${new Date(ticket.date).toLocaleString('es-CL')}</div>
                                            <div class="admin-ticket-actions">
                                                <button class="admin-action-btn view-details-btn" onclick="viewTicketDetails('${ticket.id}')">Ver</button>
                                                <button class="admin-action-btn move-btn" onclick="moveTicket('${ticket.id}', false)">Marcar Pendiente</button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// FUNCIONES DE GESTIÓN DE TICKETS
// ========================================

/**
 * Función para crear un nuevo ticket de soporte
 * Captura los datos del formulario y crea un nuevo ticket
 * @param {Event} event - Evento del formulario
 */
function createTicket(event) {
    event.preventDefault();  // Prevenir envío normal del formulario
    
    // Obtener los datos ingresados por el usuario
    const title = document.getElementById('ticketTitle').value;
    const description = document.getElementById('ticketDescription').value;
    
    // Crear objeto del nuevo ticket
    const newTicket = {
        id: Date.now().toString(),        // ID único basado en timestamp
        title: title,                     // Título del problema
        description: description,         // Descripción detallada
        userEmail: currentUser.email,     // Email del usuario que crea el ticket
        userName: currentUser.name,       // Nombre del usuario
        date: new Date().toISOString(),   // Fecha y hora de creación
        resolved: false,                  // Estado inicial: pendiente
        messages: []                      // Array vacío para mensajes del chat
    };
    
    // Agregar el ticket a la lista global
    tickets.push(newTicket);
    
    // Guardar en el navegador
    saveTickets();
    
    // Limpiar el formulario para futuros tickets
    document.getElementById('ticketTitle').value = '';
    document.getElementById('ticketDescription').value = '';
    
    // Mostrar confirmación y actualizar vista
    alert('Ticket creado exitosamente');
    showUserDashboard();
}

/**
 * Función para cambiar el estado de un ticket (pendiente/resuelto)
 * Permite a los administradores mover tickets entre columnas
 * @param {string} ticketId - ID del ticket a modificar
 * @param {boolean} resolved - Nuevo estado del ticket
 */
function moveTicket(ticketId, resolved) {
    // Buscar el ticket por su ID
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (ticket) {
        // Cambiar el estado del ticket
        ticket.resolved = resolved;
        
        // Guardar cambios en el navegador
        saveTickets();
        
        // Actualizar la vista del dashboard
        showAdminDashboard();
    }
}

/**
 * Función para mostrar los detalles completos de un ticket
 * Incluye información del ticket y el chat de soporte
 * @param {string} ticketId - ID del ticket a mostrar
 */
function viewTicketDetails(ticketId) {
    // Buscar el ticket por su ID
    const ticket = tickets.find(t => t.id === ticketId);
    
    // Si no se encuentra el ticket, salir de la función
    if (!ticket) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <div class="modal-header">
                <h2 class="modal-title">${ticket.title}</h2>
                <p class="modal-subtitle">Ticket #${ticket.id}</p>
            </div>
            
            <div class="ticket-details">
                <div class="detail-row">
                    <span class="detail-label">Usuario:</span>
                    <span class="detail-value">${ticket.userName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Fecha:</span>
                    <span class="detail-value">${new Date(ticket.date).toLocaleString('es-CL')}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Estado:</span>
                    <span class="detail-value">${ticket.resolved ? 'Resuelto' : 'Pendiente'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Descripción:</span>
                </div>
                <div class="ticket-description-full">${ticket.description}</div>
            </div>
            
            <div class="chat-section">
                <h3>Chat de Soporte <span class="auto-update-indicator">🔄 Actualización automática</span></h3>
                <div class="chat-messages" id="chatMessages">
                    ${ticket.messages.map(message => `
                        <div class="message ${message.sender === 'user' ? 'user' : 'admin'}">
                            <div class="message-header">${message.sender === 'user' ? ticket.userName : 'Administrador IT'} - ${new Date(message.timestamp).toLocaleString('es-CL')}</div>
                            <div>${message.text}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="chat-input">
                    <input type="text" id="messageInput" placeholder="Escribe tu mensaje..." onkeypress="sendMessage(event, '${ticketId}')">
                    <button class="send-btn" onclick="sendMessage(null, '${ticketId}')">Enviar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Hacer scroll automático al final del chat para ver los mensajes más recientes
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Iniciar la actualización automática del chat cada 2 segundos
    startChatAutoUpdate(ticketId);
}

/**
 * Función abreviada para abrir el chat de un ticket
 * Es lo mismo que ver los detalles del ticket
 * @param {string} ticketId - ID del ticket
 */
function openChat(ticketId) {
    viewTicketDetails(ticketId);
}

/**
 * Función para enviar un mensaje en el chat de soporte
 * Maneja tanto el envío con Enter como con el botón
 * @param {Event} event - Evento del teclado o clic
 * @param {string} ticketId - ID del ticket
 */
function sendMessage(event, ticketId) {
    // Si es un evento de teclado y no es Enter, no hacer nada
    if (event && event.key !== 'Enter') return;
    
    // Obtener el mensaje del campo de entrada
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    // Si el mensaje está vacío, no hacer nada
    if (!message) return;
    
    // Buscar el ticket correspondiente
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    // Crear el nuevo mensaje
    const newMessage = {
        sender: currentUser.role === 'admin' ? 'admin' : 'user',  // Determinar quién envía
        text: message,                                            // Contenido del mensaje
        timestamp: new Date().toISOString()                       // Fecha y hora
    };
    
    // Agregar el mensaje al ticket
    ticket.messages.push(newMessage);
    
    // Guardar en el navegador
    saveTickets();
    
    // Limpiar el campo de entrada
    messageInput.value = '';
    
    // Actualizar la vista del chat inmediatamente
    updateChatMessages(ticketId);
}

/**
 * Función para cerrar el modal de detalles del ticket
 * Limpia el modal y detiene la actualización automática del chat
 */
function closeModal() {
    // Buscar y eliminar el modal de la página
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
    
    // Detener la actualización automática del chat para ahorrar recursos
    if (chatUpdateInterval) {
        clearInterval(chatUpdateInterval);
        chatUpdateInterval = null;
    }
}

// ========================================
// FUNCIONES DE ALMACENAMIENTO Y ACTUALIZACIÓN
// ========================================

/**
 * Función para guardar todos los tickets en el navegador
 * Utiliza localStorage para persistencia de datos
 */
function saveTickets() {
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

// ========================================
// FUNCIONES DE ACTUALIZACIÓN AUTOMÁTICA DEL CHAT
// ========================================

/**
 * Función para iniciar la actualización automática del chat
 * Actualiza los mensajes cada 2 segundos
 * @param {string} ticketId - ID del ticket del chat
 */
function startChatAutoUpdate(ticketId) {
    // Detener cualquier intervalo anterior para evitar duplicados
    if (chatUpdateInterval) {
        clearInterval(chatUpdateInterval);
    }
    
    // Configurar actualización automática cada 2 segundos
    chatUpdateInterval = setInterval(() => {
        updateChatMessages(ticketId);
    }, 2000);
}

/**
 * Función para actualizar la vista de los mensajes del chat
 * Recrea todos los mensajes en la interfaz
 * @param {string} ticketId - ID del ticket del chat
 */
function updateChatMessages(ticketId) {
    // Buscar el ticket correspondiente
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    // Obtener el contenedor de mensajes
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Recrear todos los mensajes en la interfaz
    chatMessages.innerHTML = ticket.messages.map(message => `
        <div class="message ${message.sender === 'user' ? 'user' : 'admin'}">
            <div class="message-header">${message.sender === 'user' ? ticket.userName : 'Administrador IT'} - ${new Date(message.timestamp).toLocaleString('es-CL')}</div>
            <div>${message.text}</div>
        </div>
    `).join('');
    
    // Mantener el scroll al final para ver los mensajes más recientes
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ========================================
// EVENTOS GLOBALES Y CONFIGURACIÓN
// ========================================

/**
 * Evento global para cerrar el modal al hacer clic fuera de él
 * Mejora la experiencia de usuario
 */
window.onclick = function(event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        closeModal();
    }
}

// ========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ========================================

/**
 * Función que se ejecuta cuando la página se carga completamente
 * Verifica si hay una sesión activa y muestra la interfaz correspondiente
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay una sesión activa guardada en el navegador
    if (currentUser) {
        // Si hay sesión activa, mostrar el dashboard correspondiente
        if (currentUser.role === 'admin') {
            showAdminDashboard();  // Dashboard de administrador
        } else {
            showUserDashboard();   // Dashboard de usuario
        }
    }
    
    // Mostrar información de usuarios para pruebas en la consola
    console.log('=== USUARIOS DISPONIBLES PARA PRUEBAS ===');
    console.log('Usuario 1:', users[0].email, 'Contraseña:', users[0].password);
    console.log('Usuario 2:', users[1].email, 'Contraseña:', users[1].password);
    console.log('Administrador:', users[2].email, 'Contraseña:', users[2].password);
    console.log('==========================================');
});
