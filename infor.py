import eyed3
import os
# folder_path = './Musics'
xxx = os.listdir()
s = ""
for i in xxx:
    if i.endswith('.mp3'):
        # print(i)
        x = eyed3.load(i)
        s = s + '{ \n\tartist:"' + x.tag._getArtist() + '", \n\tname: "' + \
            x.tag._getTitle() + '", \n\turl: "Musics/' + i + '"},\n'
    else:
        s = s + '{ \n\tartist: "unknown",'  '\n\tname:"'+ i[:-4] +'" , \n\turl: "Musics/' + i + '"},\n'
print(s)
