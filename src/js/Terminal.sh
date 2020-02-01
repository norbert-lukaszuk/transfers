ssh-keygen -t rsa -C "opis klucza" -f "nazwa pliku klucza" //tworzenie klucza (-t typ klucza tu rsa) (-c metka z opisem na końcu klucza)
clip < ~/.ssh/key#2.pub //kopiuj tekst klucza key#2.pub do schowka
github: settings > ssh and GPG keys > new ssh key > wklejamy zawartość schowka i nazywamy klucz // klucz dodany powinien działać
$ eval $(ssh-agent -s) // odpal ssh-agent w tle
ssh-add ~/.ssh/klucz //dodaj klucz
$ ssh-add -d ~/.ssh/key#2 //usuwa key#2 z agenta
$ ssh-add -l //lista dodanych do agenta kluczy