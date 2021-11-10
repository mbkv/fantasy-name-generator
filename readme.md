Generate a set of random possible fantasy names by using the /usr/share/dict
directory containing a list of all possible words and reversing them. I found
this generates decently reliable and reasonably creative results

```bash
$ yarn ts-node bin/fantasyNames.ts > names
$ shuf -n 5 names | column -t -s ' '
aisrep   persia
latanerp prenatal
mrah     harm
zzar     razz
ssid     diss
```

I've also found the quality of the list improves if you include other word lists
which you can download via

```bash
$ apt-cache search wordlist | grep '^w' | sort
wamerican - American English dictionary words for /usr/share/dict
wamerican-huge - American English dictionary words for /usr/share/dict
wamerican-insane - American English dictionary words for /usr/share/dict
wamerican-large - American English dictionary words for /usr/share/dict
...
```

Although I can't say I recommend all of the wordlists. Some seem to be so
massive that it fills up all of your suggestions

You can also force a specific word list by providing multiple arguments

```bash
$ yarn ts-node bin/fantasyNames.ts /usr/share/dict/german-medical | shuf -n 1
laromuh humoral
```