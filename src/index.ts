import express from "express";
import cors from "cors";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

// Importamos la lógica que aislaste en el paso anterior
import { registrarHerramientasPipedrive } from "./pipedrive-logic.js";

const app = express();
app.use(cors()); // Permite conexiones desde cualquier LLM
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 1. Inicializamos el servidor MCP
const mcpServer = new Server(
  { name: "pipedrive-mcp-render", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 2. Registramos las herramientas del repositorio original
registrarHerramientasPipedrive(mcpServer);

// 3. Mapa para mantener múltiples sesiones activas
const transports = new Map<string, SSEServerTransport>();

// RUTA GET: Inicializa la conexión de streaming
app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  await mcpServer.connect(transport);
  
  const sessionId = transport.sessionId;
  transports.set(sessionId, transport);
  
  // Limpiar memoria si se desconecta
  req.on('close', () => {
    transports.delete(sessionId);
  });
});

// RUTA POST: Recibe las instrucciones del LLM
app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.get(sessionId);
  
  if (!transport) {
    return res.status(404).send("Sesión no encontrada");
  }
  
  await transport.handleMessage(req.body);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor MCP listo y escuchando en el puerto ${PORT}`);
});
