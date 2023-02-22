
// cre https://www.facebook.com/profile.php?id=100030906050783
// NV Binh

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audio= $('#audio') // get element audio player!
const progress = $('#progress');// get element input range
let playing = false; // status 'playing' when first load app
const loader = $('.loader'); // get element current progress
const bgContainer = $('.container')
const bgMain = $('.main-bg')

const curSong = $('.cur-playing') // get element to render current songs

//// get element button control
const playPause = $('.play-pause');
const btnPlay = $('.btn-play')
const btnPause = $('.btn-pause')
const btnNext = $('.next')
const btnPrev = $('.prev')
const repeat = $('.repeat')// get element repeat current song
let isRepeat 
const shuffle = $('.shuffle') //get element random song
let isShuffle

const list = $('.column') // get element to render songs


const theme = $('.theme-icon') //get element change theme
let ramdomMemory = [];
var listSong ; //get song after render playlist
var currentSong =0; // index song

const playList = [
    {
        src:"./acssets/mp3/CoChacYeuLaDay.mp3",
        nameSong: "Có Chắc Yêu Là Đây",
        singer: "Sơn Tùng M-TP",
        img: "https://image-us.24h.com.vn/upload/3-2020/images/2020-07-09/2-1594262919-373-width660height412.jpg"
    },
    {
        src:"./acssets/mp3/suytnuathi.mp3",
        nameSong: "Suýt Nữa Thì",
        singer: "Andiez",
        img: "https://i.ytimg.com/vi/cUmpJ2zwfVU/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/maimaikhongphaianh.mp3",
        nameSong: "Mãi Mãi Không Phải Anh",
        singer: "Thanh Bình",
        img: "https://i.ytimg.com/vi/677bAENZAEI/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/NoiNayCoAnh.mp3",
        nameSong: "Nơi Này Có Anh",
        singer: "Sơn Tùng M-TP",
        img: "https://kenh14cdn.com/2017/sontung2-1487156115154.jpg" 
    },
    {
        src:"./acssets/mp3/MuonRoiMaSaoCon.mp3",
        nameSong: "Muộn Rồi Mà Sao Còn",
        singer: "Sơn tùng M-TP",
        img: "https://upload.wikimedia.org/wikipedia/vi/9/93/S%C6%A1n_T%C3%B9ng_M-TP_-_Mu%E1%BB%99n_r%E1%BB%93i_m%C3%A0_sao_c%C3%B2n.png"
    },
    {
        src:"./acssets/mp3/duongtoichoemve.mp3",
        nameSong: "Đường Tôi Chở Em Về",
        singer: "buitruonglinh",
        img: "https://i.ytimg.com/vi/OuNo8Tkb3lI/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/chodoicodangso.mp3",
        nameSong: "Chờ đợi có đáng sợ",
        singer: "Andiez",
        img: "https://i.ytimg.com/vi/WE05tPmCj8k/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/aidoiminhduocmai.mp3",
        nameSong: "Ai Đợi  mình Được Mãi lofi",
        singer: "Thanh Hưng",
        img: "https://i.ytimg.com/vi/LM-q6gkn63s/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/3107full.mp3",
        nameSong: "3107 Full version ",
        singer: "W/n x DuongG, Nâu , Titie, Erik",
        img: "https://i.ytimg.com/vi/GatNL0mmQGc/maxresdefault.jpg"
    },
        {
            src:"./acssets/mp3/CuChillThoi.mp3",
            nameSong: "Cứ Chill Thôi ",
            singer: "Chillies ft Suni Hạ Linh & Rhymastic",
            img: "https://lyrics-hot.com/wp-content/uploads/2021/02/loi-bai-hat-cu-chill-thoi-640.jpg"
        },
        {
            src:"./acssets/mp3/GieoQue.mp3",
            nameSong:" Gieo Quẻ ",
            singer: "Hoàng Thùy Linh x Đen Vâu",
            img: "https://vtv1.mediacdn.vn/thumb_w/640/2021/12/31/2701220944690031212547938452702125562170601n-16409622776481714933299.jpg"
    
        },
        {
            src:"./acssets/mp3/MuonRuouToTinh.mp3",
            nameSong:" Mượn Rượu Tỏ Tình",
            singer: "BIGDADDY x EMILY",
            img: "https://i.ytimg.com/vi/aGUQsb31TEw/hq720.jpg"
    
        },
    
        {
            src:"./acssets/mp3/HaiMuoiHai.mp3",
            nameSong: "Hai Mươi Hai",
            singer: "amme x Hứa Kim Tuyền",
            img: "https://i.ytimg.com/vi/n2iFnPaAsnU/maxresdefault.jpg"
        },
        {
            src:"./acssets/mp3/AnhMetRoi.mp3",
            nameSong:" Anh Mệt Rồi",
            singer: "Anh Quân Idol x Freak D",
            img: "https://i.ytimg.com/vi/wAQnEYVcOq4/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/AnhSeQuenEmMa.mp3",
            nameSong:" Anh Sẽ Quên Em Mà",
            singer: "NIT ft Sing",
            img: "https://i.ytimg.com/vi/tYNX2E6v6jU/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/ChungTaCuaHienTai.mp3",
            nameSong:" Chúng Ta Của Hiện Tại- lofi",
            singer: "MTP x CM1X",
            img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-02/chungtacuahientai.jpg"
    
        },
        {
            src:"./acssets/mp3/BuongDoiTayNhauRa.mp3",
            nameSong:" Buông Đôi Tay Nhau Ra",
            singer: "Sơn Tùng-MTP ",
            img: "https://i.ytimg.com/vi/LCyo565N_5w/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/HayTraoChoAnh.mp3",
            nameSong:"Hãy Trao Cho Anh",
            singer: "Sơn Tùng-MTP ",
            img: "https://amthanhthudo.com/wp-content/uploads/hay-trao-cho-anh.jpg"
    
        },
        {
            src:"./acssets/mp3/LacTroi.mp3",
            nameSong:"Lạc Trôi",
            singer: "Sơn Tùng-MTP ",
            img: "https://i.ytimg.com/vi/DrY_K0mT-As/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/AnhThuongEmEmThuongAi.mp3",
            nameSong:"Anh Thương Em Em Thương Ai",
            singer: " Đinh Tùng Huy ",
            img: "https://i.ytimg.com/vi/zqtMUF_6hHI/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/DomDom.mp3",
            nameSong:"Đom ĐÓm",
            singer: "K-ICM , Jack ",
            img: "https://i.ytimg.com/vi/4CCGI83vOVo/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/ChungTaCuaSauNay.mp3",
            nameSong:" Chúng Ta Của Sau Này",
            singer: "T.R.I",
            img: "https://avatar-ex-swe.nixcdn.com/song/share/2021/01/27/f/1/e/c/1611738359456.jpg"
    
        },
        {
            src:"./acssets/mp3/HetThuongCanNho.mp3",
            nameSong:" Hết Thương Cạn Nhớ",
            singer: "Đức Phúc",
            img: "https://i.ytimg.com/vi/DZDYZ9nRHfU/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/DungLoAnhDoiMa.mp3",
            nameSong:" Đừng Lo Anh Đợi Mà",
            singer: "Mr.Siro",
            img: "https://i.ytimg.com/vi/BnWiFq0AxQc/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/HoaNoKhongMau.mp3",
            nameSong:" Hoa Nở Không Màu",
            singer: "Hoài Lâm x Freak D",
            img: "https://i.ytimg.com/vi/y_6aSG2yfe8/mqdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/MuaHaNamAy.mp3",
            nameSong:" Mùa Hạ Năm Ấy",
            singer: "Linh",
            img: "https://i.ytimg.com/vi/bbiXiY_Ec_c/sddefault.jpg"
    
        },
        {
            src:"./acssets/mp3/NhuAnhDaThayEm.mp3",
            nameSong:"Như Anh Đã Thấy Em",
            singer: "Phúc XP x Freak D",
            img: "https://i.ytimg.com/vi/cPbp2iFaZRo/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/PhaiChangEmDaYeu.mp3",
            nameSong:" Phải Chăng Em Đã Yêu",
            singer: "Juky San ft Redt x Freak D ",
            img: "https://i.ytimg.com/vi/O81_4VAson4/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/AiMangCoDonDi.mp3",
            nameSong:" Ai Mang Cô Đơn Đi",
            singer: " K-ICM ft. APJ",
            img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/0/1/5/1/0151bcc5dc64312a9b6d9d2245aab54c.jpg"
    
        },
       
        {
            src:"./acssets/mp3/LiLy.mp3",
            nameSong:" lily",
            singer: "Alan Walker x K391",
            img: "https://i.ytimg.com/vi/kTJbE3sfvlI/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/TinhKaNgotNgao.mp3",
            nameSong:"Tình Ka Ngọt Ngào",
            singer: "LẬP NGUYÊN x YẾN NỒI CƠM ĐIỆN",
            img: "https://i.ytimg.com/vi/Yr7FIIshNxo/maxresdefault.jpg"
    
        },
        {
            src:"./acssets/mp3/Yeu1NguoiCoLe.mp3",
            nameSong:"Yêu Một Người Có Lẽ",
            singer: " Lou Hoàng - Miu Lê",
            img: "https://i.ytimg.com/vi/w2DBMrXJDIo/sddefault.jpg"
    
        },
        {
            src:"./acssets/mp3/LegendsNeverDie.mp3",
            nameSong:"Legends Never Die",
            singer: " Against The Curent-World 2017",
            img: "https://i.ytimg.com/vi/r6zIGXun57U/maxresdefault.jpg"
    
        },
]


const mainApp = {
    renderPlaylist : function(){
        const htmlsList = playList.map((song,index)=>{
            return `
                    <div class="song">
                        <img src="${song.img}" alt="" class="img-song-item">
                        <div class="decript">
                            <div class="name-song-item">${song.nameSong}</div>
                            <div class="singer-song-item">${song.singer}</div>
                        </div>
                        
                    </div>
                    `
        })
        list.innerHTML = htmlsList.join('')
    
        //get element listsong after render playlist
        listSong = $$('.song')
    },
    
    renderCurrentSong: function(){
        audio.src = playList[currentSong].src;
        bgContainer.style.backgroundImage =`url(${playList[currentSong].img}) `
        bgMain.style.backgroundImage = `url(${playList[currentSong].img}) `
        curSong.innerHTML = 
            `
            <div class="cur-song">
                <div class="now">Now playing :</div>
                <div class="name-song">${playList[currentSong].nameSong}</div>
                <div class="name-singer">${playList[currentSong].singer}</div>
            </div>
            <div class="cur-img">
                <img src="${playList[currentSong].img}" alt="" class="img">
                <img src="${playList[currentSong].img}" alt="" class="drop-img">
            </div>
            `

        //add class 'now-play' for first song
        listSong[currentSong].classList.add('now-play')
    },
    handleEvents: function(){
        theme.onclick =()=>{
            $('.main-bg-filter').classList.toggle('change-theme')
        }
        
        repeat.onclick = ()=>{
            isRepeat= repeat.classList.toggle('focus')
        }
        
        shuffle.onclick = ()=>{
            isShuffle= shuffle.classList.toggle('focus')
        }
        playPause.onclick = ()=>{
            if(!playing){
                generalFunction.audioPlay();
            }
            else{
                generalFunction.audioPause()
            }
        }
        
        btnNext.onclick=()=>{
            generalFunction.audioNext()
        }
        btnPrev.onclick=()=>{
            generalFunction.audioBack()
        }
        audio.onended =()=>{
            if(isRepeat){
                generalFunction.audioPlay()
            }
            else{
                generalFunction.audioNext()
            }
        }
    
        for(let j = 0 ; j< listSong.length; j++){
            listSong[j].onclick=()=>{
                currentSong = j;
                generalFunction.removeClass()
                this.renderCurrentSong()
                generalFunction.audioPlay()
            }
        }
    },

    start : function(){
        this.renderPlaylist()
        this.renderCurrentSong()
        this.handleEvents()
    }
}


const generalFunction= {
    removeClass :function(){
        var activeElements = $$(".now-play");
        for (var i = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove("now-play");
        }
    },
    audioPlay: function(){
        audio.play();
        playing= true;
        btnPlay.classList.add('dp-none')
        btnPause.classList.remove('dp-none')
    },
    
    audioPause :function(){
        audio.pause();
        playing= false;
        btnPause.classList.add('dp-none')
        btnPlay.classList.remove('dp-none')
    },
    audioNext: function(){
        if(isShuffle){
          currentSong =  this.isShuffled(playList.length, ramdomMemory)
        }
        else{
            currentSong++;
            if( currentSong >= playList.length ){
                currentSong = 0;
            }
        }
        this.removeClass() 
        mainApp.renderCurrentSong()
        this.audioPlay()
    },
    
    audioBack :function(){
        if(isShuffle){
            currentSong =  this.isShuffled(playList.length, ramdomMemory)
          }
        else{
            currentSong--;
            if( currentSong < 0 ){
                currentSong = playList.length -1 ;
            }
        }
        
        this.removeClass()
        mainApp.renderCurrentSong();
        this.audioPlay()
    },
    isShuffled: function(arrLength, arr) {
        let randomNumber = Math.floor(Math.random() * arrLength);
        while (arr.includes(randomNumber)) {
          randomNumber = Math.floor(Math.random() * arrLength);
        }
        arr.push(randomNumber);
        return randomNumber;
    },
}

//handle times
const handleTimes={
    updateTrack: function(){
        audio.ontimeupdate = function () {
            if (audio.duration) {
              const progressPercent = Math.floor(
                (audio.currentTime / audio.duration) * 100
              );
              progress.value = progressPercent ;
              if(progress.value <45){
                loader.style.width = progress.value-1.5 +2 +"%";
                }
                else{
                    loader.style.width = progress.value - 0.5 +"%";
                }
            }
          }
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };
    },
    updateTime:function(){
            var time = audio.currentTime;
            var timeSecons = Math.floor(time / 1);
            var min = Math.floor(timeSecons / 60);
            (min >= 1) ? timeSecons = timeSecons - (min*60) : min = '0';
            (timeSecons < 1) ? sec='0' : void 0;
            if(min < 10) {
                min = "0" + min;
            }
            if(timeSecons < 10) {
                timeSecons = "0" + timeSecons;
            }
            $(".curTime").innerHTML = min + ":" + timeSecons;
    }, 
    getDurationTimes:function(){
        audio.onloadedmetadata = function() {
            var time = audio.duration;
          
          
            var timeSecons = Math.floor(time / 1);
            
              var min = Math.floor(timeSecons / 60);
              (min >= 1) ? timeSecons = timeSecons - (min*60) : min = '0';
              (timeSecons < 1) ? sec='0' : void 0;
              if(min < 10) {
                min = "0" + min;
            }
              if(timeSecons < 10) {
                timeSecons = "0" + timeSecons;
            }
            $(".sumTime").innerHTML = min + ":" + timeSecons;
          };
    },
    onTimeStart:function(){
        this.updateTrack();
        setInterval('handleTimes.updateTime()', 1000);
        this.getDurationTimes()
    }
}

//start
mainApp.start()
handleTimes.onTimeStart()