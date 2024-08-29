# Assignment Notes


## Git / GitHub

### Merge Conflicts
It would seem that merge conflicts aren't as intuitive to deal with in the example of the assignment vs in normal development. As I've run across merge conflicts, they are normally only a subsection of the changes made. If I remember right, resolving that merge conflict will still automatically leave a commit to be made. But here the entire change was the entire conflict, and for some reason didn't make a commit after resolving it. This produced an error saying: `You have not concluded your merge (MERGE_HEAD exists).`

I fixed it by simply using `git commit` in the terminal prior to hitting the sync button in VS Code. That did the trick it seems. 