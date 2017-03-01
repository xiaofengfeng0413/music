$(function(){
    //$('#listWrap').find('li:first').addClass('palyIng')

    //播放音乐
    $("#play").click(function(){
        $('#musicEngine').get(0).play()
        $('#play').hide()
        $('#pause').show()
        playbackProgress('play')
    })
    $('.playitem').click(function(){
         var url = $(this).find('.s-musicer').attr('data-url')
         $('#musicEngine').attr('src',url)
         $('#listWrap').find('li').removeClass('playIng')
         $(this).addClass('playIng')
         $('#musicEngine').get(0).play()
         $('#play').hide()
         $('#pause').show()
         playbackProgress('play')
    })
    
    //暂停音乐
    $('#pause').click(function(){
        $('#musicEngine').get(0).pause()
        $('#play').show()
        $('#pause').hide()
        playbackProgress('pause')
    })
    //调整音乐进度
     $('#progressRateBg').click(function(event){
        if($('#musicEngine').get(0).src != ""){
            var activeProgress = getSongProgress(event);
            songProgressAdjust(activeProgress);
        }else{
            return false;
        }
     })
        

 
    //打开关闭专辑页面
    $('#albumLists').click(function(){
        if($('#albumLists').attr('title')=='关闭专辑页面'){
            $('#musicList').hide()
            $('#albumLists').attr('title','打开专辑页面')
        }else{
            $('#musicList').show()
            $('#albumLists').attr('title','关闭专辑页面')
        }
    })
    //打开关闭歌词页面
    $('#lyrics').click(function(){
        if($('#lyrics').attr('title')=='关闭歌词'){
            $('#lrcWrap').hide()
            $('#lyrics').attr('title','打开歌词')
        }else{
            $('#lrcWrap').show()
            $('#lyrics').attr('title','关闭歌词')
        }
    })
    //打开关闭播放模式
    $('#nowPlayManner').hover(function(){
        $('#playMannerControl').show()
    })
    $('#playMannerControl').hover(function(){
        $('#playMannerControl').show()
    },function(){
        $('#playMannerControl').hide()
    })

    //将整个界面隐藏和显示
    $('#musicPlayerSwitch').click(function(){
        if($('#musicPlayerSwitch').attr('title')=='隐藏播放器'){
            $('#musicList').css('left','-550px')
            $('#musicPlayerWrap').css('left','-550px')
            $('#musicPlayerSwitch').attr('title','打开播放器')
            $('#playerSwitchBtn').attr('class','switch-on')
        }else{
            $('#musicList').css('left','0')
            $('#musicPlayerWrap').css('left','0')
            $('#musicPlayerSwitch').attr('title','隐藏播放器')
            $('#playerSwitchBtn').attr('class','switch-off')
        }
    })


        //播放模式切换
        $('#orderPlay').bind('click',PlayModeIconChange)
        $('#singleCycle').bind('click',PlayModeIconChange)
        $('#shufflePlay').bind('click',PlayModeIconChange)
        $('#listCycle').bind('click',PlayModeIconChange)

        function PlayModeIconChange(){
            alert(this.id)
            var id = $(this).attr('id');
            var className = $(this).attr('class');
            var title = $(this).attr('title');
            var classString = 'now-manner'+' '+className+' '+className+'-active';
            alert(classString)
            $('#nowPlayManner').attr('class',classString)
            $('nowPlayManner').attr('title',title)

            var html=$('<a></a>')
            html.attr('href','javascript:void(0);')
            html.attr('id',id)
            html.attr('class',className)
            $('#playMannerControl').find(this).remove()
            $('#playMannerControl').append(html)   
        }



        //---------------------------------------------------【功能：播放进度，播放时间】


        function playbackProgress(playSwitch){
            if(playSwitch == 'play'){
                timer = setInterval(function(){
                    // 总时间
                    timeall = timeAll();
                    //当前时间
                    currenttime = currentTime();
                    //计算歌曲播放事件
                    songPlaybackTime(timeall,currenttime)
                    //计算进度条宽度并赋值
                     songSchedule = (currenttime / timeall) * 258;
                     $('#progressRateColor').css('width',songSchedule + "px")
                    //当歌曲播放完毕后
                    if($('#musicEngine').get(0).ended){
                        //清除定时器，进度条归零，播放下一首
                        clearInterval(timer);
                        $('#progressRateColor').css('width','0')
                        //document.getElementById("next").click();
                    }
                },1000)
            }
             if(playSwitch === "pause"){
                clearInterval(timer);
            }
        }
        //歌曲进度调整
        function songProgressAdjust(time){
            $("#musicEngine").get(0).currentTime = time;
        }
                //---------------------------------------------------【歌曲进度变化过程】
        function getSongProgress(event){
            // var progressRateBg = document.getElementById("progressRateBg"),
                var mplayer = $("#musicEngine").get(0),
                progressBP,
                SongProgress;

            //获得距相对元素距离的百分比
            var coord = coordinate(event),
                offsetCoord_X = coord.coord_X;
            //计算进度条的宽度
            songScheduleChange(offsetCoord_X);
            //计算进度条的宽度百分比
            progressBP = progressBarPercentage(258,offsetCoord_X) / 100;
            //真实的歌曲进度数值
            SongProgress = progressBP * mplayer.duration;
            return SongProgress;
        }
        //---------------------------------------------------【歌曲进度条变化】
        function songScheduleChange(size){
            var progressRateColor = $("#progressRateColor").get(0);
            progressRateColor.style.width = size + "px";
        }

        //---------------------------------------------------【获取歌曲总时间】
        function timeAll(){
            var mPlayer = $("#musicEngine").get(0);
            if(mPlayer.currentTime != 0){
                return mPlayer.duration;
            }else{
                return 0;
            }
        }

        //---------------------------------------------------【获取歌曲当前播放时间】
        function currentTime(){
            var mPlayer = $("#musicEngine").get(0);
            return mPlayer.currentTime;
        }

        //---------------------------------------------------【计算歌曲播放时间】
        function songPlaybackTime(timeall,currenttime){
            var playTime = $("#playTime").get(0),
                surplusTime = $("#surplusTime").get(0),
                leftTime,
                rightTime;

            if(currenttime < timeall){
                //左边时间
                leftTime = parseInt(currenttime);
                //右边时间
                rightTime = parseInt(timeall - currenttime);
                //输出时间
                playTime.innerHTML = conversionTime(leftTime);
                surplusTime.innerHTML = "-" + conversionTime(rightTime);
            }else{
                //播放完毕
                playTime.innerHTML = "0:00";
                surplusTime.innerHTML = "-0:00";
            }
        }

        //---------------------------------------------------【将剩余秒数转化为标准格式】
        function conversionTime(time){
            var surplusMinite,
                surplusSecond,
                cTime;
            //将剩余秒数转化为分钟
            surplusMinite = Math.floor((time / 60) % 60);
            //将剩余秒数转化为秒钟
            surplusSecond = Math.floor(time % 60);
            if(surplusSecond < 10){
                surplusSecond = "0" + surplusSecond;
            }
            cTime = surplusMinite + ":" + surplusSecond;
            return cTime;
        }
        //计算光标相对于第一个定位的父元素的坐标
        function coordinate(e){
          var o = window.event || e,
              coord,
              coord_X,
              coord_Y;

          coord_X = (o.offsetX === undefined) ? getOffset(o).X : o.offsetX;
          coord_Y = (o.offsetY === undefined) ? getOffset(o).Y : o.offsetY;
          coord = { "coord_X" : coord_X , "coord_Y" : coord_Y };
          return coord;
        }

        //---------------------------------------------------【计算进度条的百分比】
        function progressBarPercentage(totalLength,actLage){
            //传入总长度totalLength和当前点击的坐标actLage
            var Result = (parseInt(actLage) / parseInt(totalLength)) * 100;
            return Math.ceil(Result);
        }

                /**
         * 音量控制
         */

            $('#volumeControl').hover(function(){
                $('#volumeControl').show()
            },function(){
                $('#volumeControl').hide()
            })

        //有音量的接口
            $('#nowVolume').bind('mouseover',function(){
                $('#volumeControl').show()
            })
            $('#volume').bind('click',function(){
                volume('on')
            })
        //没音量接口

            $('#nowMute').bind('mouseover',function(){
                $('#volumeControl').show()
            })
            $('#mute').bind('click',function(){
                volume('off')
            })

        //调整音量进度条
        //上调
        $('#volumeSizeColor').click(function(){
            var voiceProcess = VolumeChangeProcess(event)
            volumeControlStrip(voiceProcess)
        })
        //下调
        $('#volumeSizeBg').click(function(){
            var voiceProcess = VolumeChangeProcess(event)
            volumeControlStrip(voiceProcess)
        })
        //---------------------------------------------------【功能：静音切换】
        function volume(muteSwitch){
            var volumeSizeColor = $("#volumeSizeColor").get(0),
                volumeSizeSave = parseInt(volumeSizeColor.style.height);

            //设为静音
            if(muteSwitch === "on"){
                //记录静音前的音量大小
                volumeSizeColor.attributes["data-volume"].nodeValue = $("#musicEngine").get(0).volume;
                //记录静音前的元素高度
                volumeSizeColor.attributes["data-height"].nodeValue = volumeSizeSave;
                $("#musicEngine").get(0).volume = 0.0;
                //音量图标切换 - 打开静音
                volumeIconSwitch("on");
                //音量控件的音量条变化(100为元素高度)
                volumeSize(100);
            }
            //取消静音
            if(muteSwitch === "off"){
                $("#musicEngine").get(0).volume = volumeSizeColor.attributes["data-volume"].nodeValue;
                //音量图标切换 - 关闭静音
                volumeIconSwitch("off");
                //音量控件的音量条变化
                volumeSize(volumeSizeColor.attributes["data-height"].nodeValue);
            }
        };

        //---------------------------------------------------【功能：音量控制条】
        function volumeControlStrip(realVolume){
            $("#musicEngine").get(0).volume = realVolume;
            if(realVolume > 0){
                //音量图标切换 - 关闭静音
                volumeIconSwitch("off");
            }else{
                //音量图标切换 - 打开静音
                volumeIconSwitch("on");
            }
        };

        //---------------------------------------------------【音量变化过程】
        function VolumeChangeProcess(event){
            var volumeSizeBg = $("#volumeSizeBg").get(0),
                progressBP,
                realVolume;

            //获得距相对元素距离的百分比
            var coord = coordinate(event),
                offsetCoord_Y = coord.coord_Y;
            //音量杆动画变化
            progressBP = progressBarPercentage(48,offsetCoord_Y);
            volumeSize(progressBP);
            //真实的音量数值0.0~1.0
            realVolume = parseInt((100 - progressBP) / 10) / 10;
            return realVolume;
        }

        //---------------------------------------------------【音量的图标切换】
        function volumeIconSwitch(muteSwitch){
            // var nowVolume = document.getElementById("nowVolume").get(0),
            //     nowMute = document.getElementById("nowMute").get(0),
            //     volume = document.getElementById("volume").get(0),
            //     mute = document.getElementById("mute").get(0),
                var  volumeSizeColor = $("#volumeSizeColor").get(0);
            //打开静音
            if(muteSwitch === "on"){
                //静音的显示图标变化
                $('#nowVolume').hide();
                $('#nowMute').show();
                //音量控件的图标变化
                $('#volume').hide();
                $('#mute').show();
                //音量为0时，让音量杆也为0，优化视觉
                volumeSizeColor.style.height = "100%";
            }
            //关闭静音
            if(muteSwitch === "off"){
                //静音的显示图标变化
                $('#nowMute').hide();
                $('#nowVolume').show();
                //音量控件的图标变化
                $('#mute').hide();
                $('#volume').show();
            }
        }

        //---------------------------------------------------【音量控件的音量条变化】
        function volumeSize(size){
            $("#volumeSizeColor").css('height',size + "%")
        }

        //---------------------------------------------------【音量控件显示&隐藏，大小调节】
        // (function(){
        //     var nowVolume = document.getElementById("nowVolume"),
        //         nowMute = document.getElementById("nowMute"),
        //         volumeControl = document.getElementById("volumeControl");

        //     //音量控件显示&隐藏
        //     nowVolume.onmouseover = function(){
        //         show(volumeControl);
        //     };
        //     nowMute.onmouseover = function(){
        //         show(volumeControl);
        //     };
        //     //解决onmouseout事件遇到子元素时，也触发onmouseout的BUG
        //     volumeControl.onmouseout = function(event){
        //         var Event = event || window.event;
        //         if(Event){
        //             if(volumeControl.contains(Event.relatedTarget||Event.toElement)){
        //                 //如果是子元素，结束函数
        //                 return false;
        //              }else{
        //                 //触发的事件
        //                 hide(volumeControl);
        //             }
        //         }
        //     };
        // })();


       //添加mask层
       $('.album_item').hover(function(){
            
       })

})


