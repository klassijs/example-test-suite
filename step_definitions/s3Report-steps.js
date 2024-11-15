const s3File = require('klassi-js/runtime/s3ReportProcessor');
const sFile = require('klassi-js/runtime/reporter/reporter');

Then(/^Compiling and sending the resulting test report data$/, async () => {
  /** process the files in s3 bucket and sends an email with all html links */
  await s3File.s3Processor();
});

Then(/^combining the jsons to create one html file$/, async () => {
  /** process the files in s3 bucket and sends an email with all html links */
  await sFile.reporter();
});
