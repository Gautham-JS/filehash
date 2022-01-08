rdir=$(pwd)
echo "Sourcing env... rdir = $rdir"
source "$rdir/resources/setup/env.sh"

export ROOTDIR=$rdir;

echo "Starting Node service..."
node "$rdir/src/main/main.js" > /dev/stdout

