#!/bin/sh

PROJECT_KEY=agid-appaltinnovativi
SONAR_URL=http://localhost:9000
SONAR_TOKEN=e827fd2db93a5f91d561be21a1667246bdf7efcb

sonar-scanner \
  -Dsonar.projectKey=$PROJECT_KEY \
  -Dsonar.sources=. \
  -Dsonar.host.url=$SONAR_URL \
  -Dsonar.login=$SONAR_TOKEN

java -jar ../sonar-reports/sonar-cnes-report-3.2.2.jar \
    -p $PROJECT_KEY \
    -s $SONAR_URL \
    -t $SONAR_TOKEN

DATE="$(date +%Y-%m-%d)"
mkdir -p ../sonar-reports/$DATE
libreoffice --headless --convert-to pdf:writer_web_pdf_Export "$DATE"-appaltinnovativi-analysis-report.docx --outdir ../sonar-reports/$DATE
mv "$DATE"-appaltinnovativi-issues-report.xlsx ../sonar-reports/$DATE
rm "$DATE"*