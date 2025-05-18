document.addEventListener('DOMContentLoaded', function() {
    const videoList = document.getElementById('videoList');
    
    function loadVideos() {
        // Get videos from localStorage
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        
        if (videos.length === 0) {
            videoList.innerHTML = '<p>> No videos found.</p>';
            return;
        }
        
        let html = '';
        videos.forEach((video, index) => {
            html += `
                <div class="video-item">
                    <span class="video-name">${video.name}</span>
                    <div class="video-actions">
                        <a href="#" class="play-btn" data-index="${index}">PLAY</a>
                        <a href="#" class="delete-btn" data-index="${index}">DELETE</a>
                    </div>
                </div>
            `;
        });
        
        videoList.innerHTML = html;
        
        // Add event listeners
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const index = this.getAttribute('data-index');
                playVideo(index);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const index = this.getAttribute('data-index');
                deleteVideo(index);
            });
        });
    }
    
    function playVideo(index) {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        if (index >= 0 && index < videos.length) {
            const video = videos[index];
            
            // Create video player
            videoList.innerHTML = `
                <div class="video-player">
                    <video controls autoplay style="width:100%;">
                        <source src="${video.data}" type="${video.type}">
                        Your browser does not support the video tag.
                    </video>
                    <p><a href="#" id="backToList"><< Back to list</a></p>
                </div>
            `;
            
            document.getElementById('backToList').addEventListener('click', function(e) {
                e.preventDefault();
                loadVideos();
            });
        }
    }
    
    function deleteVideo(index) {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        if (index >= 0 && index < videos.length) {
            if (confirm(`Delete ${videos[index].name}?`)) {
                videos.splice(index, 1);
                localStorage.setItem('videos', JSON.stringify(videos));
                loadVideos();
            }
        }
    }
    
    loadVideos();
});
