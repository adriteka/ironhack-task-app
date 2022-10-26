<template>
  <section>
    <header>
      <h3 class="title is-5 tasklist-title">Task Management</h3>
    </header>
    <article>
      <p>
        <b>1MTD List Manager</b> freely adapts the
        <a href="https://myn-1mtd.com/" target="_blank">1MTD and MYN</a>
        productivity systems created by Michael Linenberger. These are the bases
        for the version implemented in this web app:
      </p>
      <h4 class="title is-5 pt-5 mb-4">Three Lists</h4>
      <p>Each task belongs to one of 3 lists:</p>
      <ul>
        <li>
          The <b>Critical</b> list contains tasks <em>absolutely due today</em>.
          In order to create or move a task into this list ask yourself
          <em>
            'Would I be willing to go to bed late to get this item completed?' </em
          >. If the answer is no, put it in the <i>Opportunity</i> list.
        </li>
        <li>
          The <b>Opportunity</b> list contains both ideas that you want to think
          about 1-2 more days before deciding on their urgency and tasks you'll
          tackle today provided you find the moment to do so.
        </li>
        <li>
          The <b>Horizon</b> list contains items that don't meet the previous
          criteria and could wait for more than 10 days to complete.
        </li>
      </ul>
      <h4 class="title is-5 pt-5 mb-4">List Review Cycles</h4>
      <p>Each list gets reviewed at a different frequency:</p>
      <ul>
        <li>Critical items are reviewed once <b>each hour</b>.</li>
        <li>Opportunity items are reviewed at <b>once every day</b>.</li>
        <li>Horizon items are reviewed <b>once a week</b></li>
      </ul>
      <h4 class="title is-5 pt-5 mb-4">List Sizes</h4>
      <p>
        In order to be able to manage each list at the specified rate, the
        number of items each one holds has to be limited:
      </p>
      <ul>
        <li>
          Try to keep the Critical list <b>under 5 items</b> and never let it go
          over 10 items. Any larger than that and important things will start
          slipping through the cracks.
        </li>
        <li>
          Limit the Opportunity list to <b>up to 20 items</b> in order to be
          able to scan through and digest them in one glance.
        </li>
        <li>
          The Horizon list can get as big as necessary as it serves as a
          catch-all for things.
        </li>
      </ul>
    </article>
  </section>
</template>
<script></script>
<style scoped>
header {
  padding-bottom: 0.75rem;
  border-bottom: 2px solid black;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

article {
  font-size: 1.125rem;
}

p {
  padding-bottom: 0.25rem;
}

ul {
  list-style: disc outside;
  font-size: 1rem;
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
