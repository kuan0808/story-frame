package log

import (
	"io"

	"github.com/sirupsen/logrus"
)

type severity string

// Define key
const (
	// log severity
	SeverityDefault   severity = "DEFAULT"
	SeverityDebug     severity = "DEBUG"
	SeverityInfo      severity = "INFO"
	SeverityNotice    severity = "NOTICE"
	SeverityWarning   severity = "WARNING"
	SeverityError     severity = "ERROR"
	SeverityCritical  severity = "CRITICAL"
	SeverityAlert     severity = "ALERT"
	SeverityEmergency severity = "EMERGENCY"
)

func init() {
	logrus.SetFormatter(&logrus.JSONFormatter{
		FieldMap: logrus.FieldMap{
			logrus.FieldKeyMsg:   "message",
			logrus.FieldKeyLevel: "severity",
		},
		DisableTimestamp: true,
	})
	logrus.SetLevel(logrus.DebugLevel)
}

// SetOutput 设定日志输出
func SetOutput(out io.Writer) {
	logrus.SetOutput(out)
}

func writeLog(s severity, message interface{}, data interface{}) {
	logEntry := logrus.WithFields(logrus.Fields{
		"data": data,
	})
	if s == SeverityDebug {
		logEntry.Debug(message)
	} else if s == SeverityInfo {
		logEntry.Info(message)
	} else if s == SeverityWarning {
		logEntry.Warning(message)
	} else if s == SeverityError {
		logEntry.Error(message)
	} else if s == SeverityCritical {
		logEntry.Fatal(message)
	}
}

// DebugWithData .
func DebugWithData(message interface{}, data interface{}) {
	writeLog(SeverityDebug, message, data)
}

// InfoWithData .
func InfoWithData(message interface{}, data interface{}) {
	writeLog(SeverityInfo, message, data)
}

// WarningWithData .
func WarningWithData(message interface{}, data interface{}) {
	writeLog(SeverityWarning, message, data)
}

// ErrorWithData .
func ErrorWithData(message interface{}, data interface{}) {
	writeLog(SeverityError, message, data)
}

// FatalWithData .
func FatalWithData(message interface{}, data interface{}) {
	writeLog(SeverityCritical, message, data)
}

// Define logrus alias
var (
	Debugf     = logrus.Debugf
	Infof      = logrus.Infof
	Warnf      = logrus.Warnf
	Errorf     = logrus.Errorf
	Fatalf     = logrus.Fatalf
	Panicf     = logrus.Panicf
	Printf     = logrus.Printf
	Info       = logrus.Info
	Debug      = logrus.Debug
	Error      = logrus.Error
	Warningf   = logrus.Warningf
	Warn       = logrus.Warn
	Warning    = logrus.Warning
	WithFields = logrus.WithFields
	Fatal      = logrus.Fatal
)
