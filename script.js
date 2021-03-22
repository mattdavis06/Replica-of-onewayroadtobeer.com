const countdownOneA = document.getElementById('countdown_one_a')
const countdownOneB = document.getElementById('countdown_one_b')
const countdownTwo = document.getElementById('countdown_two')
const countdownThree = document.getElementById('countdown_three')
const countdownFour = document.getElementById('countdown_four')
const gridDiv = document.querySelectorAll('.grid')

const navIcon = document.querySelector('.beer-icon')
const closeIcon = document.querySelector('.close-icon')
const modal = document.getElementById('modal')

navIcon.addEventListener('click', () => {
    modal.classList.add('open')
})

closeIcon.addEventListener('click', () => {
    modal.classList.remove('open')
})

const currentDate = new Date()

const stageOneA = new Date ('March 8, 2021 00:00:00'),
stageOneB = new Date('March 29, 2021 00:00:00'),
stageTwo = new Date('April 12, 2021 00:00:00'),
stageThree = new Date('May 17, 2021 00:00:00'),
stageFour = new Date('June 21 ,2021 00:00:00').getTime()



function fullTimeRemaining(stage, countdown, templateArea) {

    const currentDate = new Date()
    const time = stage - currentDate

    const daysCount = Math.floor(time/ 1000 / 60 / 60 / 24);
    const hoursCount = Math.floor(time/ 1000 / 60 / 60) % 24;
    const minutesCount = Math.floor(time / 1000 / 60) % 60;
    const secondsCount = Math.floor(time/ 1000) % 60;

    const gridLayout = countdown.parentNode.parentNode
    gridLayout.style.gridTemplateAreas = templateArea
    

    countdown.innerHTML = `
    <div class="lrg-number">${daysCount < 10 ? '0' + daysCount : daysCount}<span>days</span></div>
    <div class="lrg-number">${hoursCount < 10 ? '0' + hoursCount : hoursCount}<span>hours</span></div>
    <div class="lrg-number">${minutesCount < 10 ? '0' + minutesCount : minutesCount}<span>mins</span></div>
    <div class="lrg-number">${secondsCount < 10 ? '0' + secondsCount : secondsCount}<span>secs</span></div>
    `
}

function daysRemaining(stage, countdown) {

    const currentDate = new Date()
    const timeLeftOneB = stage - currentDate

    const daysCount = Math.floor(timeLeftOneB / 1000 / 60 / 60 / 24);
    
    countdown.innerHTML = `
    <div class="days">${daysCount < 10 ? '0' + daysCount : daysCount}<span>days</span></div>
    `
}

function removeActiveClass() {
    gridDiv.forEach((div) => {
        if(div.classList.contains('active')) {
            div.classList.remove('active')
        }
    })
}

function addActiveClass(countdown) {
    const parent = countdown.parentNode
    parent.classList.remove('box')
    parent.classList.add('active')     
}

function setStageComplete(countdown) {
   
    const completedStageIcon = countdown.parentNode.children[2].children[0].lastElementChild
    const completedStageText = completedStageIcon.parentNode
    
    completedStageIcon.innerHTML = `
    <ion-icon name="checkmark-circle-outline"></ion-icon>
    `
    completedStageIcon.style.color = '#fff'
    completedStageText.style.color = '#fff'

}

const timeinterval = setInterval(updateClockCoutdown, 1000)

function updateClockCoutdown() {
    if(stageOneA >= currentDate && stageOneA < stageOneB) {

        const tempArea = '"one one two" "three four five"'
        fullTimeRemaining(stageOneA, countdownOneA, tempArea)

    } else {
        
        removeActiveClass()
        setStageComplete(countdownOneA)
        countdownOneA.previousElementSibling.innerHTML = 'You can have a beer in the park with a friend!'
    }
    
    if(stageOneB >= currentDate && stageOneA < currentDate) {

        const tempArea = '"one two two" "three four five"'
        addActiveClass(countdownOneB)
        fullTimeRemaining(stageOneB, countdownOneB, tempArea)

    } else if (stageOneB < currentDate) {

        removeActiveClass()
        setStageComplete(countdownOneB)
        countdownOneB.previousElementSibling.innerHTML = 'You can have a beer in the park with five friends!'

    } else {

        daysRemaining(stageOneB, countdownOneB)
    }
    
    if(stageTwo >= currentDate && stageOneB < currentDate) {

        const tempArea = '"one two four" "three three five"'
        addActiveClass(countdownTwo)
        fullTimeRemaining(stageTwo, countdownTwo, tempArea)

    } else if (stageTwo < currentDate) {

        removeActiveClass()
        setStageComplete(countdownTwo)
        countdownTwo.previousElementSibling.innerHTML = 'You can have a beer in the garden with five friends!'

    } else {

        daysRemaining(stageTwo, countdownTwo)
    }
    
    if(stageThree >= currentDate && stageTwo < currentDate) {

        const tempArea = '"one two three" "four four five"'
        addActiveClass(countdownThree)
        fullTimeRemaining(stageThree, countdownThree, tempArea)

    } else if (stageThree < currentDate) {

        removeActiveClass()
        setStageComplete(countdownThree)
        countdownThree.previousElementSibling.innerHTML = 'You can have a beer in the pub with five friends!'

    } else{

        daysRemaining(stageThree, countdownThree)
    }
    
    if(stageFour >= currentDate && stageThree < currentDate) {

        const tempArea = '"one two three" "four five five"'
        addActiveClass(countdownFour)
        fullTimeRemaining(stageFour, countdownFour, tempArea)

    } else if (stageFour < currentDate) {
        
        removeActiveClass()
        setStageComplete(countdownFour)
        countdownFour.previousElementSibling.innerHTML = 'You can have a beer everywhere, with everyone!'

    } else {

        daysRemaining(stageFour, countdownFour)

    }

    if(stageOneA && stageOneB && stageTwo && stageThree && stageFour < currentDate) {
        const tempArea = '"one two three" "four five five"'
        removeActiveClass()
        setStageComplete(countdownFour)
        fullTimeRemaining(stageFour, countdownFour, tempArea)
        countdownFour.innerText = ""
        countdownFour.previousElementSibling.innerHTML = 'You can have a beer everywhere, with everyone!'

        clearInterval(timeinterval)
    }
}

updateClockCoutdown()








