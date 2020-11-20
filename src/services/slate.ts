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
import Cache from "../cache";

export class SlateServer {
  private server: Server;
  private io: socketio.Server;
  private text: Record<string, unknown>;
  private readonly cache: Cache;

  constructor(server: Server) {
    this.server = server;
    this.initSocket();
    // Keep cache for 1D
    this.cache = new Cache(60 * 60 * 24);
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
      socket.on(INIT_TEXT_REQUEST, (data) => {
        const textVal = this.cache.get(data.key, this.text);
        this.io.emit(INIT_TEXT, textVal);
      });

      socket.on(EDITOR_OPERATIONS, (data: IEditorData) => {
        const { groupId } = data;
        const REMOTE_EDITOR_OPERATIONS_GROUPID = `${REMOTE_EDITOR_OPERATIONS}_${groupId}`;
        this.cache.set(groupId, data.editorText);
        this.io.emit(REMOTE_EDITOR_OPERATIONS_GROUPID, data);
      });
    });
  }
}
