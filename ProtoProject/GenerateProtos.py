import subprocess, os
import sys
from os import listdir

paths = os.environ.copy()

def generateJSFileFromProtos(filename,inputDir,outputDir):
    namelist = filename.split('.')
    print(namelist[0])
    #csFileName = namelist[0] + ".cs";
    # csFileName = outputDir + "/" + csFileName;
    protoFileName = namelist[0] + ".proto";
    protoFileName = protoFileName
    print(protoFileName)
    command = "protoc --js_out=import_style=commonjs,binary:%s %s" % (outputDir,protoFileName);
    print(command)
    subprocess.Popen(command,shell=True)


def generateCSFileFromProtos(filename,inputDir,outputDir):
    namelist = filename.split('.')
    print(namelist[0])
    #csFileName = namelist[0] + ".cs";
    # csFileName = outputDir + "/" + csFileName;
    protoFileName = namelist[0] + ".proto";
    protoFileName = inputDir + "/" + protoFileName
    print(protoFileName)
    command = "protoc --proto_path=%s --csharp_out=%s %s" % (inputDir,outputDir,protoFileName);
    print(command)
    subprocess.Popen(command,shell=True)

def runProtoGeneration():
    js_output_dir = sys.argv[1]
    cs_output_dir = sys.argv[2]
    filenames =  os.listdir(os.getcwd())
    inputDir  = os.getcwd()
    outputDir = os.path.abspath(os.path.join(inputDir,os.pardir)) + "\Protos"
    print(outputDir)
    if os.path.exists(outputDir) == False:
        os.mkdir(outputDir)

    # generateProtoForFile(file,inputDir,outputDir)

    for file in filenames:
        extension = file.split('.');
        csFileName = inputDir + "/" + extension[0] + '.js'
        print(extension[1])
        if extension[1] == 'proto':
            generateCSFileFromProtos(file,inputDir,cs_output_dir)
            generateJSFileFromProtos(file,inputDir,js_output_dir)

if __name__ == '__main__':
    runProtoGeneration()
