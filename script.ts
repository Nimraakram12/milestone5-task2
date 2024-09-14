document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
   event.preventDefault();
   // Profile picture input
   const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

   // Type assertion
   const nameElement = document.getElementById('name') as HTMLInputElement;
   const emailElement = document.getElementById('email') as HTMLInputElement;
   const phoneElement = document.getElementById('phone') as HTMLInputElement;
   const qualificationElement = document.getElementById('qualification') as HTMLTextAreaElement;
   const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
   const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;

   if (profilePictureInput && nameElement && emailElement && phoneElement && qualificationElement && experienceElement && skillsElement) {
       const name = nameElement.value;
       const email = emailElement.value;
       const phone = phoneElement.value;
       const qualification = qualificationElement.value;
       const experience = experienceElement.value;
       const skills = skillsElement.value;

       // Profile picture elements
       const profilePictureFile = profilePictureInput.files?.[0];
       const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

       // Create resume output
       const resumeOutput = `
       <h1>Resume Preview</h1>
       ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
       <p><strong>Name: </strong><span id="edit-name" class="editable">${name}</span></p>
       <p><strong>Email: </strong><span id="edit-email" class="editable">${email}</span></p>
       <p><strong>Phone Number:</strong><span id="edit-phone" class="editable">${phone}</span></p>

       <h2>Qualification:</h2>
       <p id="edit-qualification" class="editable">${qualification}</p>

       <h2>Experience:</h2>
       <p id="edit-experience" class="editable">${experience}</p>

       <h2>Skills:</h2>
       <p id="edit-skills" class="editable">${skills}</p>
       `;

       const resumeOutputElement = document.getElementById('resumeOutput');
       if (resumeOutputElement) {
           resumeOutputElement.innerHTML = resumeOutput;
           resumeOutputElement.classList.remove("hidden");

           // Check if the buttons already exist to prevent multiple creation
           let buttonsContainer = document.getElementById("buttonContainer");
           if (!buttonsContainer) {
               buttonsContainer = document.createElement("div");
               buttonsContainer.id = "buttonContainer";
               resumeOutputElement.appendChild(buttonsContainer);
           }

           // Add download PDF button
           if (!document.getElementById("downloadButton")) {
               const downloadButton = document.createElement("button");
               downloadButton.id = "downloadButton";
               downloadButton.textContent = "Download As PDF";
               downloadButton.addEventListener("click", () => {
                   window.print();
               });
               buttonsContainer.appendChild(downloadButton);
           }

           // Add shareable link button
           if (!document.getElementById("shareLinkButton")) {
               const shareLinkButton = document.createElement("button");
               shareLinkButton.id = "shareLinkButton";
               shareLinkButton.textContent = "Copy Shareable Link";
               shareLinkButton.addEventListener("click", async () => {
                   try {
                       const shareableLink = `https://yourdomain.com/resume/${name.replace(/\s+/g, "_")}_cv.html`;
                       await navigator.clipboard.writeText(shareableLink);
                       alert("Shareable link copied to clipboard!");
                   } catch (err) {
                       console.error("Failed to copy link:", err);
                       alert("Failed to copy link to clipboard. Please try again.");
                   }
               });
               buttonsContainer.appendChild(shareLinkButton);
           }
       } else {
           console.error("No elements with id 'resumeOutput' found.");
       }
   } else {
       console.error("Form elements are missing.");
   }
});
