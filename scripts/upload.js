document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const videoInput = document.getElementById('videoInput');
    const progressContainer = document.getElementById('progressContainer');
    const uploadProgress = document.getElementById('uploadProgress');
    const status = document.getElementById('status');
    const fileName = document.getElementById('fileName');
    
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const file = videoInput.files[0];
        if (!file) return;
        
        // Show progress container
        progressContainer.classList.remove('hidden');
        fileName.textContent = file.name;
        status.textContent = 'Starting upload...';
        
        // Create a FileReader to read the file
        const reader = new FileReader();
        
        reader.onloadstart = function() {
            status.textContent = 'Reading file...';
        };
        
        reader.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentLoaded = Math.round((e.loaded / e.total) * 100);
                uploadProgress.value = percentLoaded;
                status.textContent = `Uploading: ${percentLoaded}%`;
            }
        };
        
        reader.onload = function(e) {
            // File is loaded, now "save" it (to localStorage for this demo)
            // In a real app, you would send to a server
            status.textContent = 'Finalizing upload...';
            uploadProgress.value = 100;
            
            // Store video in localStorage (limited to 5MB in most browsers)
            try {
                // For larger files, we'd need a different approach
                // This is simplified for the demo
                const videoData = e.target.result;
                
                // Get existing videos or create new array
                const videos = JSON.parse(localStorage.getItem('videos')) || [];
                
                // Add new video
                videos.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                    // For actual files, we'd need to store them differently
                    // This is just a placeholder
                    data: videoData
                });
                
                // Save back to localStorage
                localStorage.setItem('videos', JSON.stringify(videos));
                
                status.textContent = 'Upload complete!';
                
                // Reset form after delay
                setTimeout(function() {
                    uploadForm.reset();
                    progressContainer.classList.add('hidden');
                }, 2000);
                
            } catch (error) {
                status.textContent = 'Error: ' + error.message;
            }
        };
        
        reader.onerror = function() {
            status.textContent = 'Error reading file';
        };
        
        // Read as data URL (for demo purposes)
        reader.readAsDataURL(file);
    });
});
