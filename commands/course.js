exports.command = 'course'
 exports.desc = 'Print the current course'
 exports.builder = {
     dir: {
         default: 'course_cmd'
     }
 }
 exports.handler = function (argv) {
     console.log('Print detailed informations on the current course')
 }
