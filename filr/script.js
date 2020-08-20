$(function(){
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
    var nowSong  = $('#now-song');
    var nextSong = $('#next-song');
    var next1Song = $('#next1-song');
    var next2Song = $('#next2-song');
    var next3Song = $('#next3-song');

    var preSong =$('#pre-song');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
		playPauseButton = $("#play-pause-button"),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;

	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

	var songs = [
    {
        artist: "unknown",
        name:"7 Years__Lukas Graham__500" ,
        url: "Musics/7 Years__Lukas Graham__500.m4a"},
    {
        artist:"Imagine Dragons",
        name: "Bad Liar",
        url: "Musics/Bad Liar__Imagine Dragons__320.mp3"},
    {
        artist: "unknown",
        name:"Bánh Mì Không__Đạt G;   DuUyen__500" ,
        url: "Musics/Bánh Mì Không__Đạt G;   DuUyen__500.m4a"},
    {
        artist:"Kina,  Adriana Proenza",
        name: "Can We Kiss Forever?",
        url: "Musics/Can We Kiss Forever __Kina; Adriana Proenza__320.mp3"},
    {
        artist: "unknown",
        name:"Có Chàng Trai Viết Lên Cây__Phan Mạnh Quỳnh__500" ,
        url: "Musics/Có Chàng Trai Viết Lên Cây__Phan Mạnh Quỳnh__500.m4a"},
    {
        artist: "unknown",
        name:"Dancing" ,
        url: "Musics/Dancing.m4a"},
    {
        artist:"Vương Thất Thất",
        name: "Em Bằng Lòng Làm Một Người Bình Thường Ở Bên Cạnh Anh (我愿意平凡的陪在你身旁) DjYaha",
        url: "Musics/Em Bằng Lòng Làm Một Người Bình Thường Ở Bên Cạnh Anh (我愿意平凡的陪在你身旁) DjYaha__Vương Thất Thất__320.mp3"},
    {
        artist:"Ngô Lan Hương",
        name: "Hãy Trao Cho Anh (remix) - Ngô Lan Hương{Vinahouse}",
        url: "Musics/Hãy Trao Cho Anh (remix) - Ngô Lan Hương{Vinahouse}__Ngô Lan Hương__320.mp3"},
    {
        artist: "unknown",
        name:"Hết Thương Cạn Nhớ__Đức Phúc__500" ,
        url: "Musics/Hết Thương Cạn Nhớ__Đức Phúc__500.m4a"},
    {
        artist:"Đạt G,   Du Uyên",
        name: "Khó Vẽ Nụ Cười",
        url: "Musics/Khó Vẽ Nụ Cười__Đạt G;    Du Uyên__320.mp3"},
    {
        artist: "unknown",
        name:"Lily__Alan Walker; K-391; Emelie Hollow__500" ,
        url: "Musics/Lily__Alan Walker; K-391; Emelie Hollow__500.m4a"},
    {
        artist: "unknown",
        name:"Lost Control__Alan Walker; Sorana__500" ,
        url: "Musics/Lost Control__Alan Walker; Sorana__500.m4a"},
    {
        artist: "unknown",
        name:"Lấy Chồng Sớm Làm Gì (Acoustic Version)__Huy R;  Tuấn Cry__500" ,
        url: "Musics/Lấy Chồng Sớm Làm Gì (Acoustic Version)__Huy R;  Tuấn Cry__500.m4a"},
    {
        artist: "unknown",
        name:"Lối Nhỏ__Đen; Phương Anh Đào__500" ,
        url: "Musics/Lối Nhỏ__Đen; Phương Anh Đào__500.m4a"},
    {
        artist:"Bán Dương",
        name: "Một Khúc Tương Tư (一曲相思)",
        url: "Musics/mktt.mp3"},
    {
        artist:"Dig DiDzay",
        name: "Nếu Anh Đi Cover",
        url: "Musics/NeuAnhDi.mp3"},
    {
        artist: "unknown",
        name:"Người Lạ Ơi__Oi-Karik-Orange-Superbrothers__500" ,
        url: "Musics/Người Lạ Ơi__Oi-Karik-Orange-Superbrothers__500.m4a"},
    {
        artist: "unknown",
        name:"Nơi Em Muốn Tới__Xesi;Hoaprox__500" ,
        url: "Musics/Nơi Em Muốn Tới__Xesi;Hoaprox__500.m4a"},
    {
        artist:"DIG DIDZAY",
        name: "Nếu Em Đi (Cover)",
        url: "Musics/Nếu Em Đi (Cover)__DIG DIDZAY__320.mp3"},
    {
        artist: "unknown",
        name:"On My Way__Alan Walker;Sabrina Carpenter;Farruko__500" ,
        url: "Musics/On My Way__Alan Walker;Sabrina Carpenter;Farruko__500.m4a"},
    {
        artist:"Ed Sheeran",
        name: "Shape Of You",
        url: "Musics/Shape Of You__Ed Sheeran__128.mp3"},
    {
        artist: "unknown",
        name:"Ta Còn Yêu Nhau__Đức Phúc__500" ,
        url: "Musics/Ta Còn Yêu Nhau__Đức Phúc__500.m4a"},
    {
        artist:"Olly Murs",
        name: "That Girl",
        url: "Musics/thatgirl.mp3"},
    {
        artist: "unknown",
        name:"Tát Nhật Lãng Rực Rỡ (火红的萨日朗)__Yếu Bất Yếu Mãi Thái__500" ,
        url: "Musics/Tát Nhật Lãng Rực Rỡ (火红的萨日朗)__Yếu Bất Yếu Mãi Thái__500.m4a"},
    {
        artist:"Ice Paper",
        name: "Tâm Lặng Như Nước (心如止水)",
        url: "Musics/Tâm Lặng Như Nước (心如止水)__Ice Paper__320.mp3"},
    {
        artist: "unknown",
        name:"Vì Yêu Cứ Đâm Đầu__Min;   Đen;   JustaTee__500" ,
        url: "Musics/Vì Yêu Cứ Đâm Đầu__Min;   Đen;   JustaTee__500.m4a"},
    {
        artist:"Avicii; Aloe Blacc",
        name: "Wake Me Up",
        url: "Musics/wakemeup.mp3"},
    {
        artist:"Avicii; Sandro Cavazza",
        name: "Without You",
        url: "Musics/withoutyou.mp3"}
    ]
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }


	function showHover(event)
	{
		seekBarPos = sArea.offset();
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());

		sHover.width(seekT);

		cM = seekLoc / 60;

		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;

        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;

		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;

        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);

		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);

	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);
    }

    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);

		playProgress = (audio.currentTime / audio.duration) * 100;

		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;

		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;

        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);

        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);

        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


		seekBar.width(playProgress+'%');

		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }

    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        {
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;
            
            if(currIndex==0)
                preAlbum = "-----begin-------";
            else
                preAlbum = songs[currIndex-1].name;
            nextAlbum = songs[currIndex+1].name;
            audio.src = songs[currIndex].url;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            preSong.text(preAlbum);
            nowSong.text(currAlbum);
            nextSong.text(nextAlbum);
            if(currIndex<songs.length-2){
            next1Song.text(songs[currIndex+2].name);
            next2Song.text(songs[currIndex+3].name);
//            next3Song.text(songs[currIndex+4].name);
            }
            else{
                next1Song.text("-------end--------");
                next2Song.text("-------end-------");
                next3Song.text("-------end-------");
            }
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{
        audio = new Audio();

		selectTrack(0);

		audio.loop = false;

		playPauseButton.on('click',playPause);

		sArea.mousemove(function(event){ showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click',playFromClickedPos);

        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}

	initPlayer();
});
