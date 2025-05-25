#!/bin/sh

# Path file mapping
SCRIPT_MAP_FILE="/usr/src/app/start-scripts.env"

# Default fallback script
DEFAULT_SCRIPT="start"

# Ambil script berdasarkan NODE_ENV
if [ -z "$NODE_ENV" ]; then
  echo "Warning: NODE_ENV not set, defaulting to $DEFAULT_SCRIPT"
  SCRIPT=$DEFAULT_SCRIPT
else
  # Ambil baris dari file
  SCRIPT=$(grep "^$NODE_ENV=" "$SCRIPT_MAP_FILE" | cut -d '=' -f2)

  if [ -z "$SCRIPT" ]; then
    echo "Warning: No script mapping found for NODE_ENV=$NODE_ENV, defaulting to $DEFAULT_SCRIPT"
    SCRIPT=$DEFAULT_SCRIPT
  fi
fi

echo "Starting with NODE_ENV=$NODE_ENV -> npm run $SCRIPT"
echo "SCRIPT=$SCRIPT"
exec npm run "$SCRIPT"
