#!/bin/bash

_SCRIPTDIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
source "$_SCRIPTDIR/../config/local.sh"

output_file="$_SCRIPTDIR/../config/local.env"
if [[ -f "$output_file" ]] ; then
  rm "$output_file"
fi

while read -r line ; do
  [[ $line =~ ^export\ ([^=]+)=(.*)$ ]] || continue
  var="${BASH_REMATCH[1]}"
  val="${!var//$'\n'/}"
  echo "$var=$val" >> "$output_file"
done < "$_SCRIPTDIR/../config/local.sh"

echo "CI=true" >> "$output_file"