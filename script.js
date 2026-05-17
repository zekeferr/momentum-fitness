/*
    Author: Zeke Ferreira
    Date: 5/17/26
*/

/* Mobile menu button */

    var menuButton = document.getElementById("menuButton");
    var navList = document.getElementById("navList");

    if (menuButton && navList) {
        menuButton.addEventListener("click", function() {
            navList.classList.toggle("show");
        });
    }

/* Form validation */

    var allowedOptions = ["option-one", "option-two", "option-three"];
    var mainForm = document.getElementById("mainForm");

    if (mainForm) {
        mainForm.addEventListener("submit", function(event) {
            event.preventDefault();
            validateForm();
        });
    }

    function validateForm() {
        var errors = [];

        var fullName = document.getElementById("fullName").value.trim();
        var email = document.getElementById("email").value.trim();
        var phone = document.getElementById("phone").value.trim();
        var optionType = document.getElementById("optionType").value;
        var comments = document.getElementById("comments").value.trim();
        var age = document.getElementById("age").value.trim();
        var dateChoice = document.getElementById("dateChoice").value;
        var timeChoice = document.getElementById("timeChoice").value;

        var fields = [fullName, email, phone, optionType, comments, age, dateChoice, timeChoice];

        for (var i = 0; i < fields.length; i++) {
            if (fields[i] === "") {
                errors.push("All fields must be filled out.");
                break;
            }
        }

        if (!validEmail(email)) {
            errors.push("Email must be in a valid format.");
        }

        if (!validPhone(phone)) {
            errors.push("Phone number must follow this pattern: 555-555-5555.");
        }

        if (isNaN(age) || Number(age) < 13 || Number(age) > 100) {
            errors.push("Age must be a number between 13 and 100.");
        }

        if (allowedOptions.indexOf(optionType) === -1) {
            errors.push("Please choose a valid membership type.");
        }

        switch (timeChoice) {
            case "morning":
            case "afternoon":
            case "evening":
                break;
            default:
                errors.push("Please choose a valid training time.");
        }

        showMessages(errors);
    }

    function validEmail(email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validPhone(phone) {
        var phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        return phonePattern.test(phone);
    }

    function showMessages(errors) {
        var messageBox = document.getElementById("formMessages");
        messageBox.innerHTML = "";

        if (errors.length > 0) {
            messageBox.className = "error";

            var errorList = document.createElement("ul");

            for (var i = 0; i < errors.length; i++) {
                var errorItem = document.createElement("li");
                errorItem.textContent = errors[i];
                errorList.appendChild(errorItem);
            }

            messageBox.appendChild(errorList);
        } else {
            messageBox.className = "success";
            messageBox.textContent = "Registration submitted successfully.";
            document.getElementById("mainForm").reset();
        }
    }

/* Event calendar */

    var calendarEvents = [
        {
            title: "Karate Competitive",
            date: "2026-06-01",
            time: "10:00 AM",
            description: "A chance for our Karate trainees to show off their skills and compete against eachother."
        },
        {
            title: "Zumba Special",
            date: "2026-06-08",
            time: "2:00 PM",
            description: "A special class focused specifically on Zumba workouts."
        },
        {
            title: "Salsa Special",
            date: "2026-06-15",
            time: "6:30 PM",
            description: "A starter dance workshop for Salsa dancing."
        },
        {
            title: "Basketball Open Court",
            date: "2026-06-22",
            time: "12:00 PM",
            description: "Open court time for members and non-members alike who want to play basketball or practice shots."
        }
    ];

    var currentCalendarDate = new Date();
    var calendarGrid = document.getElementById("calendarGrid");
    var calendarMonth = document.getElementById("calendarMonth");
    var previousMonthButton = document.getElementById("previousMonth");
    var nextMonthButton = document.getElementById("nextMonth");
    var calendarList = document.getElementById("calendarList");
    var showAllEventsButton = document.getElementById("showAllEvents");
    var showUpcomingEventsButton = document.getElementById("showUpcomingEvents");

    if (calendarGrid && calendarMonth) {
        buildCalendar(currentCalendarDate);
        displayCalendarEvents(calendarEvents);
    }

    if (previousMonthButton) {
        previousMonthButton.addEventListener("click", function() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            buildCalendar(currentCalendarDate);
        });
    }

    if (nextMonthButton) {
        nextMonthButton.addEventListener("click", function() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            buildCalendar(currentCalendarDate);
        });
    }

    if (showAllEventsButton) {
        showAllEventsButton.addEventListener("click", function() {
            displayCalendarEvents(calendarEvents);
        });
    }

    if (showUpcomingEventsButton) {
        showUpcomingEventsButton.addEventListener("click", function() {
            var upcomingEvents = [];
            var today = new Date();

            for (var i = 0; i < calendarEvents.length; i++) {
                var eventDate = new Date(calendarEvents[i].date + "T23:59:59");

                if (eventDate >= today) {
                    upcomingEvents.push(calendarEvents[i]);
                }
            }

            displayCalendarEvents(upcomingEvents);
        });
    }

    function buildCalendar(dateToShow) {
        calendarGrid.innerHTML = "";

        var year = dateToShow.getFullYear();
        var month = dateToShow.getMonth();

        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        calendarMonth.textContent = monthNames[month] + " " + year;

        for (var i = 0; i < dayNames.length; i++) {
            var dayHeading = document.createElement("div");
            dayHeading.className = "calendar-day-name";
            dayHeading.textContent = dayNames[i];
            calendarGrid.appendChild(dayHeading);
        }

        var firstDayOfMonth = new Date(year, month, 1);
        var startingDay = firstDayOfMonth.getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();

        for (var blank = 0; blank < startingDay; blank++) {
            var emptyCell = document.createElement("div");
            emptyCell.className = "calendar-cell empty-cell";
            calendarGrid.appendChild(emptyCell);
        }

        for (var day = 1; day <= daysInMonth; day++) {
            var dateString = makeDateString(year, month, day);
            var dayCell = document.createElement("div");
            dayCell.className = "calendar-cell";
            dayCell.textContent = day;

            if (isToday(year, month, day)) {
                dayCell.classList.add("today");
            }

            if (hasEvent(dateString)) {
                dayCell.classList.add("event-day");
                dayCell.title = getEventTitles(dateString);
            }

            calendarGrid.appendChild(dayCell);
        }
    }

    function makeDateString(year, month, day) {
        var realMonth = month + 1;
        var monthText = realMonth < 10 ? "0" + realMonth : realMonth;
        var dayText = day < 10 ? "0" + day : day;

        return year + "-" + monthText + "-" + dayText;
    }

    function isToday(year, month, day) {
        var today = new Date();

        return year === today.getFullYear() &&
               month === today.getMonth() &&
               day === today.getDate();
    }

    function hasEvent(dateString) {
        for (var i = 0; i < calendarEvents.length; i++) {
            if (calendarEvents[i].date === dateString) {
                return true;
            }
        }

        return false;
    }

    function getEventTitles(dateString) {
        var titles = [];

        for (var i = 0; i < calendarEvents.length; i++) {
            if (calendarEvents[i].date === dateString) {
                titles.push(calendarEvents[i].title);
            }
        }

        return titles.join(", ");
    }

    function displayCalendarEvents(events) {
        calendarList.innerHTML = "";

        if (events.length === 0) {
            calendarList.textContent = "No events to show.";
            return;
        }

        events.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        for (var i = 0; i < events.length; i++) {
            var eventBox = document.createElement("article");
            eventBox.className = "calendar-event";

            var eventTitle = document.createElement("h3");
            eventTitle.textContent = events[i].title;

            var eventDate = document.createElement("p");
            eventDate.textContent = "Date: " + events[i].date;

            var eventTime = document.createElement("p");
            eventTime.textContent = "Time: " + events[i].time;

            var eventDescription = document.createElement("p");
            eventDescription.textContent = events[i].description;

            eventBox.appendChild(eventTitle);
            eventBox.appendChild(eventDate);
            eventBox.appendChild(eventTime);
            eventBox.appendChild(eventDescription);

            calendarList.appendChild(eventBox);
        }
    }

/* Slideshow */

    var slides = [
        {
            title: "Kickboxing",
            description: "Build cardio, coordination, and confidence through kickboxing classes.",
            image: "images/kickboxing.jpg"
        },
        {
            title: "Yoga",
            description: "Improve flexibility, balance, and recovery with guided yoga sessions.",
            image: "images/yoga.jpg"
        },
        {
            title: "Basketball Court",
            description: "Use the full basketball court for practice, training, and open play.",
            image: "images/basketball_court2.jpg"
        }
    ];

    var currentSlide = 0;
    var slideImage = document.getElementById("slideImage");
    var slideTitle = document.getElementById("slideTitle");
    var slideDescription = document.getElementById("slideDescription");

    if (slideImage && slideTitle && slideDescription) {
        document.getElementById("nextSlide").addEventListener("click", function() {
            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            showSlide();
        });

        document.getElementById("prevSlide").addEventListener("click", function() {
            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            showSlide();
        });

        showSlide();
    }

    function showSlide() {
        slideImage.src = slides[currentSlide].image;
        slideTitle.textContent = slides[currentSlide].title;
        slideDescription.textContent = slides[currentSlide].description;
    }
