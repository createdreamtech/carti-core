#!/usr/bin/bash
PACKAGE_EXAMPLE_DIR=${PWD}/package_example
mkdir -p ${PACKAGE_EXAMPLE_DIR}
#echo `docker run cartesi/playground cartesi-machine --dump-machine-config 2> ${current_dir}/testoutput`
docker run -v ${PACKAGE_EXAMPLE_DIR}:/example cartesi/playground /bin/cp -r /opt/cartesi/share/images /example

echo "generating cartesi machine with following parameters"
echo "docker run cartesi/playground cartesi-machine --dump-machine-config"
docker run cartesi/playground cartesi-machine --dump-machine-config -- "ls /bin" 2>${PACKAGE_EXAMPLE_DIR}/testoutput
TEMPFILE=${PACKAGE_EXAMPLE_DIR}/testoutput
sed '$d' ${TEMPFILE} | sed '$d' > ${PACKAGE_EXAMPLE_DIR}/example_machine_config.lua
# ${pwd}/example_machine_config.lua ${pwd}/images
# takes arguments where to store , the package data directory and where to install it 
INSTALLATION_DIR=$2
STORAGE_TYPE=$1
echo "to use disk as backing store"
echo "running: node build/src/examples/index.js ${STORAGE_TYPE} ${PWD} ${INSTALLATION_DIR}"
RESULT=$(node ./build/src/examples/index.js ${STORAGE_TYPE} ${PACKAGE_EXAMPLE_DIR} ${INSTALLATION_DIR})
echo "Execute the following command to run the machine just installed"
echo $RESULT