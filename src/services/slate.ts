import socketio, { Socket } from "socket.io";
import { Server } from "http";
import {
  ON_CONNECTION,
  REMOTE_EDITOR_OPERATIONS,
  EDITOR_OPERATIONS,
  IEditorData,
  INIT_TEXT,
  INIT_TEXT_REQUEST
} from "../constants/types";

export class SlateServer {
  private server: Server;
  private io: socketio.Server;
  private text: Record<string, unknown>;

  constructor(server: Server) {
    this.server = server;
    this.initSocket();
    this.text = {
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    };
    this.startSlateServer();
  }

  initSocket(): void {
    this.io = socketio(this.server);
  }

  startSlateServer(): void {
    this.io.on(ON_CONNECTION, (socket: Socket) => {
      socket.on(INIT_TEXT_REQUEST, () => {
        this.io.emit(INIT_TEXT, this.text);
      });

      socket.on(EDITOR_OPERATIONS, (data: IEditorData) => {
        this.text = data.editorText;
        this.io.emit(REMOTE_EDITOR_OPERATIONS, data);
      });
    });
  }
}
