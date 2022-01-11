pragma solidity ^0.8.2;

contract TodoList {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  uint nextId = 1;

  mapping (uint => Task) tasks;

  Task[] listTask;

  function createTask(string memory _content, string memory _author) external {
    tasks[nextId] = (Task(nextId, block.timestamp, _content, _author, false));
    listTask.push(Task(nextId, block.timestamp, _content, _author, false));
    nextId++;
  }

  function getTask(uint _id) external view returns (uint, uint, string memory, string memory, bool) {
    return (_id, tasks[_id].date, tasks[_id].content, tasks[_id].author, tasks[_id].done);
  }

  function getTasks()
    external
    view
    returns(Task[] memory) {
   return listTask;
  }

  function doneTask(uint _id) external {
    tasks[_id].done = true;
  }
}