<template>
  <section>
    <article>
      <h3 class="title is-5">Principles</h3>
      <div>
        <p>
          <b>1MTD List Manager</b> freely adapts the
          <a href="https://myn-1mtd.com/" target="_blank">1MTD and MYN</a>
          productivity systems created by Michael Linenberger. These are the
          bases for the version implemented in this web app:
        </p>
        <h4 class="title is-5 pt-5 mb-4">Three Lists</h4>
        <p>Each task belongs to one of 3 lists:</p>
        <ul>
          <li>
            Put tasks in the <b>Critical</b> list if they are
            <em>absolutely due today</em>. First, make sure they're stated as an
            action (i.e. start with a verb), then ask yourself
            <em>
              "Would I be willing to work late to get this item completed?" </em
            >. If the answer is no, put them in the Opportunity list instead.
          </li>
          <li>
            Place in the <b>Opportunity</b> list both ideas that you want to
            think about 1-2 more days before deciding on their urgency and tasks
            you'd tackle whenever you found a gap in your schedule.
          </li>
          <li>
            Send to the <b>Horizon</b> list any item that doesn't meet the
            previous criteria and could wait for more than 10 days to complete.
          </li>
        </ul>
        <h4 class="title is-5 pt-5 mb-4">List Sizes</h4>
        <p>
          In order to make the most out of each list, the number of items they
          hold has to be limited:
        </p>
        <ul>
          <li>
            Try to keep the Critical list <b>under 5 items</b> and never let it
            go over 10 items. Any larger than that and important things will
            start slipping through the cracks.
          </li>
          <li>
            Limit the Opportunity list to <b>up to 20 items</b> in order to be
            able to scan through them all in one glance.
          </li>
          <li>
            Don't worry about the Horizon list that much: it can get as big as
            necessary as it serves as a catch-all for things.
          </li>
        </ul>
        <h4 class="title is-5 pt-5 mb-4">List Review Cycles</h4>
        <p>Each list gets reviewed at its own frequency:</p>
        <ul>
          <li>Review Critical items once <b>each hour</b>.</li>
          <li>
            Review Opportunity items <b>once a day</b> after you're done with
            your Critical tasks.
          </li>
          <li>Review Horizon items <b>once a week</b>.</li>
        </ul>
        <h4 class="title is-5 pt-5 mb-4">List Prioritization</h4>
        <p>
          Each list works under the "fresh principle": it gives prominence to
          the items you intend to deal closest to today. This is where Start Dates
          come to play:
        </p>
        <ul>
          <li>
            <b>Start Dates</b> determine where and when tasks will be displayed
            on their list: tasks starting today will always appear at their top,
            older tasks will be displayed further down the list (for better or
            for worse, they are "over their prime time"), and future tasks will
            be hidden until their time comes.
          </li>
          <li>
            <b>Due Dates</b> should only be used for tasks that actually have a
            deadline. Don't put artificial due dates to trick yourself into
            getting things done.
          </li>
        </ul>
      </div>
    </article>
    <article>
      <h3 class="title is-5 tasklist-title">Usual Workflow</h3>
      <div>
        <p>
          As previously mentioned, <b>Start Dates</b> greatly determine
          what appears at the top of each list. You can change dates
          manually (except for Critical tasks); however, the app also offers
          useful <b>Refresh</b> and <b>Postpone</b> actions that'll change dates
          for you in order to quickly move tasks up and down (or even hide from)
          their list so you can focus on the top contenders.
        </p>
        <ul>
          <li>
            <b>Start the day </b> taking care of Critical items right off the
            bat. Check tasks off as you complete them and keep coming
            back for more. If you have spare time (e.g. between tasks,
            appointments being cancelled last minute, etc.), look over your
            Opportunity list for possible alternatives to stay productive.
          </li>
          <li>
            <b>Whenever a new thought pops into your head</b>, free that mental
            space by simply adding it to the Opportunity list with a Start Date
            set to today. Conveniently, the app already provides such defaults
            for you.
          </li>
          <li>
            <b>At the end of the day</b>, review the Opportunity list: delete
            meaningless new entries (some thoughts gathered during the day won't
            make the cut), promote to Critical those you intend to work on the
            next day, refresh entries that you want to keep on top of the list,
            and postpone or move to Horizon the ones you want to deal with at a
            later stage.
          </li>
          <li>
            <b>At the end of the week</b>, review the Horizon list: similar to
            what you do each day with the Opportunity list, consider whether to
            promote, refresh, postpone, or delete items at your discretion.
          </li>
        </ul>
        <p class="pt-5 cta">
          Now it's up to you to
          <router-link :to="{ name: 'home' }"
            >put things into practice</router-link
          >.
        </p>
      </div>
    </article>
  </section>
</template>
<script></script>
<style scoped>
section {
  padding-bottom: 3rem;
}

h3 {
  text-align: center;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid black;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

article {
  font-size: 1.125rem;
}
article > div {
  margin-inline: auto;
  max-width: 80ch;
}

p {
  padding-bottom: 0.25rem;
}

p.cta {
  text-align: center;
}

ul {
  list-style: disc outside;
  /* font-size: 1rem; */
}

ul li {
  margin-left: 2rem;
  padding-block: 0.5rem;
}

a {
  text-decoration: underline;
}

b {
  font-weight: 500;
}
</style>
