import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { baseUrl } from "~/utils/config.js";

const connection = new HubConnectionBuilder()
  .withUrl(baseUrl + 'notifyHub') // Замените на URL вашего SignalR хаба
  .withAutomaticReconnect()
  .configureLogging(LogLevel.None)
  .build();

export default connection;
