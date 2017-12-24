git grep -i '{translate}.*{/translate}' | sed -e 's/.*{translate}\(.*\){\/translate}.*/\1/' | awk '{print tolower($0)}' | sort -u

git grep '{translate}.*{/translate}' | grep -oh '{translate}.*{/translate}'