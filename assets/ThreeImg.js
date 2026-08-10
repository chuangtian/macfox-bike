$(function () {
            var dataLength = data.length
            var customSpeed = speed
            //detect events
            var hasTouch = 'ontouchstart' in window,
                startEvent = hasTouch ? 'touchstart' : 'mousedown',
                moveEvent = hasTouch ? 'touchmove' : 'mousemove',
                endEvent = hasTouch ? 'touchend' : 'mouseup',
                cancelEvent = hasTouch ? 'touchcancel' : 'mouseup';
            let proPlayers = [];
            let controlPanels = [];
            let proImgs = []

            if ($.isArray(data[0])) {
                for (let id = 0; id < data.length; id++) {
                    const element = data[id];
                    const elLength = element.length
                    proPlayers[id] = {}
                    proPlayers[id].id = `3dplayer_${id}`;
                    proPlayers[id].canvasIndex = 1;
                    proPlayers[id].debug = false;
                    proPlayers[id].width = 500;
                    proPlayers[id].height = 333;
                    proPlayers[id].banner = '';
                    proPlayers[id].load = function () {
                        proPlayers[id].init_debug();
                        proPlayers[id].width = $('#' + proPlayers[id].id).attr('data-width');
                        proPlayers[id].height = $('#' + proPlayers[id].id).attr('data-height');
                        //dataLength张图片路径
                        proImgs[id].path = $('#' + proPlayers[id].id).attr('data-path');
                        // preload images
                        for (var i = 1; i <= proImgs[id].count; i++) {
                            // var url = proImgs[id].path + i + '.jpg'
                            var url = proImgs[id].path + data[id][i - 1]
                            var img = new Image();
                            proImgs[id].list[i] = img;
                            img.src = url;
                        }
                        proPlayers[id].init();
                        // proImgs[id].preloadImages(function (index, isCompleted) {
                        //   console.log(id,isCompleted);
                        //   if (isCompleted) {
                        //     showTip('yes')

                        //   } else {
                        //     showTip(index);
                        //   }
                        // });
                    }
                    //player init on image loaded
                    proPlayers[id].init = function () {
                        proPlayers[id].createcontrolPanels();
                        //detect mouse event
                        controlPanels[id].setcontrolPanels();
                        //create Images canvas
                        proPlayers[id].createCanvas();
                        //show first image
                        $(`#3dplayer_${id}`).show();
                        if (element.length > 18) {
                            proPlayers[id].rotate();
                        }
                    }

                    proPlayers[id].rotate = function () {
                        var i = 1;
                        var rotate = setInterval(function () {
                            if (i === elLength) {
                                $(`#3dplayer_${id}_1`).show();
                                $(`#d3player_${id}_0`).show();
                                clearInterval(rotate);
                            }
                            $(`#3dplayer_${id} .player_con`).hide();
                            $(`#3dplayer_${id}_` + i).show();
                            $(`#d3player_${id}_0`).show();
                            i++;
                        }, 50)
                    }

                    //触摸事件层
                    proPlayers[id].createcontrolPanels = function () {
                        var panel = '<div id="d3player_' + id + '_0" width="' + proPlayers[id].width + '" height="' + proPlayers[id].height + '" style="z-index:99;width:100%;height:100%;" class="d3player_panel" width=""></div>'
                        $('#' + proPlayers[id].id).prepend(panel)
                    }

                    proPlayers[id].init_debug = function () {
                        if (proPlayers[id].debug)
                            $('#' + proPlayers[id].id).before("<div>3d player <em id='playerTip'></em></div>")
                    }

                    proPlayers[id].turn = function (turn) {
                        var turn = turn;
                        //一开始proPlayers[id].canvasIndex == 1
                        var index = proPlayers[id].canvasIndex;
                        if (turn) {
                            index--;
                            if (index < 1)
                                index = elLength;
                        } else {
                            index++;
                            if (index > elLength)
                                index = 1;
                        }
                        return index;
                    }

                    proPlayers[id].turnLeft = function () {
                        var index = proPlayers[id].turn(false);
                        proPlayers[id].show(index);
                    }

                    proPlayers[id].turnRight = function () {
                        var index = proPlayers[id].turn(true);
                        proPlayers[id].show(index);
                    }

                    proPlayers[id].show = function (index) {
                        var preIndex = proPlayers[id].canvasIndex;
                        var currIndex = index;
                        $('#3dplayer_' + id + '_' + currIndex).show();
                        $('#3dplayer_' + id + '_' + preIndex).hide();
                        proPlayers[id].canvasIndex = index;
                    }
                    proPlayers[id].createCanvas = function () {
                        let width = document.body.clientWidth
                        //create canvas from img
                        for (var i = 1; i <= proImgs[id].count; i++) {

                            var canvas_id = `3dplayer_${id}_${i}`
                            let div = document.createElement('div');
                            div.className = 'player_con'
                            div.append(proImgs[id].list[i])
                            if (proImgs[id].count == i && proImgs[id].count < 18) {
                                div.style.display = 'flex'
                            } else {
                                div.style.display = 'none'
                            }
                            div.id = canvas_id;
                            $('#' + proPlayers[id].id).append(div);
                        }
                    }

                    function showTip(txt) {
                        if (proPlayers[id].debug)
                            $('#playerTip').text(txt);
                    }

                    // product image controller
                    proImgs[id] = {};
                    proImgs[id].list = [];
                    proImgs[id].count = data[id].length;
                    proImgs[id].completed = 0;
                    proImgs[id].path = '';
                    // proImgs[id].preloadImages = function (callback) {

                    // }

                    controlPanels[id] = {}
                    controlPanels[id].preX = 0;
                    controlPanels[id].mousedown = false;
                    controlPanels[id].speed = customSpeed;
                    controlPanels[id].setcontrolPanels = function () {
                        var canvas = $("#d3player_" + id + "_0")
                        canvas.on(startEvent, function () {
                            controlPanels[id].mousedown = true;
                            showTip(startEvent);
                        }).on(endEvent, function () {
                            controlPanels[id].mousedown = false;
                            showTip(endEvent);
                        });
                        canvas.on(moveEvent, function (e) {
                            if (controlPanels[id].mousedown) {
                                var x = e.clientX || e.touches[0].screenX;
                                var preX = controlPanels[id].preX;
                                showTip(preX + ":" + x);

                                // 大于5才移动
                                if (Math.abs(x - preX) >= controlPanels[id].speed) {
                                    controlPanels[id].callPlayer(preX, x);
                                    controlPanels[id].preX = x;
                                }
                            }
                        });

                    };


                    controlPanels[id].callPlayer = function (preX, currX) {
                        if (preX > currX)
                            proPlayers[id].turnLeft();
                        else
                            proPlayers[id].turnRight();
                    }
                    //begin exec load
                    proPlayers[id].load();
                }
            } else {
                var proPlayer = {};
                proPlayer.id = '3dplayer';
                proPlayer.canvasIndex = 1;
                proPlayer.debug = false;
                proPlayer.width = 500;
                proPlayer.height = 333;
                proPlayer.banner = '';
                proPlayer.load = function () {
                    proPlayer.init_debug();
                    proPlayer.width = $('#' + proPlayer.id).attr('data-width');
                    proPlayer.height = $('#' + proPlayer.id).attr('data-height');
                    //dataLength张图片路径
                    proImg.path = $('#' + proPlayer.id).attr('data-path');
                    // preload images
                    proImg.preloadImages(function (index, isCompleted) {
                        if (isCompleted) {
                            showTip('yes')
                            proPlayer.init();
                        } else {
                            showTip(index);
                        }
                    });
                }
                //player init on image loaded
                proPlayer.init = function () {
                    proPlayer.createControlPanel();
                    //detect mouse event
                    controlPanel.setControlPanel();
                    //create Images canvas
                    proPlayer.createCanvas();
                    //show first image
                    $('#3dplayer_1').show();
                    // if (data.length > 18) {
                    //     proPlayer.rotate();
                    // }
                }

                proPlayer.rotate = function () {
                    var i = 1;
                    var rotate = setInterval(function () {
                        if (i === dataLength) {
                            $("#3dplayer_1").show();
                            $("#d3player_0").show();
                            clearInterval(rotate);
                        }
                        $("#3dplayer .player_con").hide();
                        $("#3dplayer_" + i).show();
                        $("#d3player_0").show();
                        i++;
                    }, 50)
                }

                //触摸事件层
                proPlayer.createControlPanel = function () {
                    var panel = '<div id="d3player_0" width="' + proPlayer.width + '" height="' + proPlayer.height + '" style="z-index:99;width:100%;height:100%;" width=""></div>'
                    $('#' + proPlayer.id).prepend(panel)
                }

                proPlayer.init_debug = function () {
                    if (proPlayer.debug)
                        $('#' + proPlayer.id).before("<div>3d player <em id='playerTip'></em></div>")
                }

                proPlayer.turn = function (turn) {
                    var turn = turn;
                    //一开始proPlayer.canvasIndex == 1
                    var index = proPlayer.canvasIndex;
                    if (turn) {
                        index--;
                        if (index < 1)
                            index = dataLength;
                    } else {
                        index++;
                        if (index > dataLength)
                            index = 1;
                    }
                    return index;
                }

                proPlayer.turnLeft = function () {
                    var index = proPlayer.turn(false);
                    proPlayer.show(index);
                }

                proPlayer.turnRight = function () {
                    var index = proPlayer.turn(true);
                    proPlayer.show(index);
                }

                proPlayer.show = function (index) {
                    var preIndex = proPlayer.canvasIndex;
                    var currIndex = index;
                    $('#3dplayer_' + currIndex).show();
                    $('#3dplayer_' + preIndex).hide();
                    proPlayer.canvasIndex = index;
                }

                proPlayer.createCanvas = function () {
                    let width = document.body.clientWidth
                    //create canvas from img
                    for (var i = 1; i <= proImg.count; i++) {
                        var canvas_id = "3dplayer_" + i
                        let div = document.createElement('div');
                        div.className = 'player_con'
                        div.append(proImg.list[i])
                        div.style.display = 'none'
                        div.id = canvas_id;
                        $('#' + proPlayer.id).append(div);
                    }
                }

                function showTip(txt) {
                    if (proPlayer.debug)
                        $('#playerTip').text(txt);
                }

                // product image controller
                var proImg = {};
                proImg.list = [];
                proImg.count = dataLength;
                proImg.completed = 0;
                proImg.path = '';
                proImg.preloadImages = function (callback) {
                    for (var i = 1; i <= proImg.count; i++) {
                        // var url = proImg.path + i + '.jpg'
                        var url = proImg.path + data[i - 1].src
                        var img = new Image();
                        img.onload = function () {
                            proImg.completed++;
                            if (proImg.completed == proImg.count)
                                callback(this, 1);
                            else
                                callback(proImg.completed, 0);
                        }
                        proImg.list[i] = img;
                        img.src = url;
                        img.alt = data[i - 1].alt;
                    }
                }

                var controlPanel = {};
                controlPanel.preX = 0;
                controlPanel.mousedown = false;
                controlPanel.speed = customSpeed;
                controlPanel.setControlPanel = function () {
                    var canvas = document.getElementById('d3player_0');

                    document.addEventListener(startEvent, function (e) {
                        controlPanel.mousedown = true;
                        showTip('mousedown');
                        var x = e.clientX || e.touches[0].screenX;
                        controlPanel.preX = x;
                    }, false)
                    document.addEventListener(endEvent, function () {
                        controlPanel.mousedown = false;
                        showTip('mouseup');
                    })
                    canvas.addEventListener(moveEvent, function (e) {
                        if (controlPanel.mousedown) {
                            var x = e.clientX || e.touches[0].screenX;
                            var preX = controlPanel.preX;
                            showTip(preX + ':' + x);
                            //大于5才移动
                            if (Math.abs(x - preX) >= controlPanel.speed) {
                                controlPanel.callPlayer(preX, x);
                                controlPanel.preX = x;
                            }
                        }
                    }, false);
                }

                controlPanel.callPlayer = function (preX, currX) {
                    if (preX > currX)
                        proPlayer.turnLeft();
                    else
                        proPlayer.turnRight();
                }
                //begin exec load
                proPlayer.load();

                let hasRotate = false;
                $(window).scroll(function(){
                  const playerTop = $('#3dplayer').offset().top - 200;
                  if(!hasRotate && $(window).scrollTop() > playerTop){
                    hasRotate = true;
                    if (data.length > 18) {
                        proPlayer.rotate();
                    }
                  }
                })
            }
        })