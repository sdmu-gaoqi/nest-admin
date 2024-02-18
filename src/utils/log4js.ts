import * as Log4js from 'log4js';
import * as StackTrace from 'stacktrace-js';
import * as Path from 'path';
import log4jsConfig from '../../config/log4js'; //日志级别
import * as Moment from 'dayjs';
import Chalk from 'chalk';
import Util from 'util';

export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

// 内容跟踪类
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

Log4js.addLayout('Awesome-nest', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '';
    let position = '';

    //日志组装
    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        //显示触发日志的坐标（行/列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber},${value.columnNumber}`;
        }
        return;
      }
      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true);
      }
      messageList.push(value);
    });
    //日志组成部分
    const messageOutput: string = messageList.join(' ');
    const typeOutput = `[${logConfig.type}]${logEvent.pid.toString()} - `;
    const dateOutput = `${Moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    const moduleOutput: string = moduleName
      ? `[${moduleName}]`
      : '[LoggerService]';
    let levelOutput = `[${logEvent.level}]${messageOutput}`;
    //根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;

      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;

      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;

      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;

      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput);
        break;

      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }
    return `${Chalk.green(typeOutput)} ${dateOutput} ${Chalk.yellow(
      moduleOutput,
    )}`;
  };
});

Log4js.configure(log4jsConfig);

const myLogger = Log4js.getLogger();
myLogger.level = LoggerLevel.TRACE;
export class logger {
  static debug(...args) {
    myLogger.debug(logger.getStackTrace(), args);
  }
  static log(...args) {
    myLogger.info(logger.getStackTrace(), args);
  }
  static warn(...args) {
    myLogger.warn(logger.getStackTrace(), args);
  }
  static error(...args) {
    myLogger.error(logger.getStackTrace(), args);
  }

  static fatal(...args) {
    myLogger.fatal(logger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(logger.getStackTrace(), ...args);
  }
  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
