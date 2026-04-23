const { io } = require( "socket.io-client" );

const socket = io( "http://localhost:8080", {
  auth: { token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgxMiIsInN1YiI6MSwiaWF0IjoxNzc2OTc0MDM2LCJleHAiOjE3NzcwMDI4MzZ9.ZNdIKqfZWGIDzMnzcjWA7BwqPy6Ly7tjnBdZfxVo3hM` }
} );

let chatId;

// 👂 ver TODO lo que pasa
socket.onAny( ( event, data ) => {
  console.log( "📡 Evento:", event, data );
} );

socket.on( "connect", () => {
  console.log( "✅ Conectado:", socket.id );

  // 🔥 crear chat
  socket.emit( "createChat", {
    userId: 1,
    targetId: 2,
    isGroup: false,
  } );
} );

// 🔥 cuando se crea el chat
socket.on( "chatCreated", ( chat ) => {
  console.log( "🧠 Chat creado:", chat );

  chatId = chat.id;

  // unirse al room
  socket.emit( "joinRoom", { chatId } );

  console.log( "🚪 Unido al chat:", chatId );

  // esperar un poco antes de enviar
  setTimeout( () => {
    console.log( "✉️ Enviando mensaje..." );

    socket.emit( "sendMessage", {
      content: "Hola desde script 🔥",
      senderId: 1,
      chatId: chatId,
    } );
  }, 2000 );
} );

// 👂 recibir mensajes
socket.on( "newMessage", ( msg ) => {
  console.log( "📩 Nuevo mensaje recibido:", msg );
} );
