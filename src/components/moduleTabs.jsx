import PropTypes from "prop-types";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { Tabs, Button, Flex, Badge, Text } from "@mantine/core";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab_ } from "../redux/moduleslice";
import classes from "../Modules/Dashboard/Dashboard.module.css";

function ModuleTabs({ tabs, activeTab, setActiveTab, badges = [] }) {
  const tabsListRef = useRef(null);
  const dispatch = useDispatch();

  const handleTabChange = (direction) => {
    const currentIndex = parseInt(activeTab, 10);
    const newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, tabs.length - 1)
        : Math.max(currentIndex - 1, 0);
    setActiveTab(String(newIndex));
    dispatch(setActiveTab_(tabs[newIndex].title));
    if (tabsListRef.current) {
      const scrollAmount = direction === "next" ? 200 : -200;
      tabsListRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(String(index));
    dispatch(setActiveTab_(tabs[index].title));
  };

  return (
    <div className={classes.tabsWrapper}>
      <Button
        onClick={() => handleTabChange("prev")}
        className={classes.navigationButton}
        variant="default"
        p={0}
      >
        <CaretCircleLeft
          weight="light"
          className={classes.fusionCaretCircleIcon}
        />
      </Button>

      <div className={classes.tabsScrollArea} ref={tabsListRef}>
        <Tabs value={activeTab} onChange={handleTabClick}>
          <Tabs.List className={classes.tabsList}>
            {tabs.map((tab, index) => (
              <Tabs.Tab
                value={String(index)}
                key={index}
                className={activeTab === String(index) ? classes.activeTab : ""}
                style={{ whiteSpace: "nowrap" }}
              >
                <Flex gap="4px" align="center" style={{ whiteSpace: "nowrap" }}>
                  <Text style={{ whiteSpace: "nowrap" }}>{tab.title}</Text>
                  {badges[index] > 0 && (
                    <Badge
                      color={badges[index] > 0 ? "blue" : "grey"}
                      size="sm"
                      p={6}
                    >
                      {badges[index]}
                    </Badge>
                  )}
                </Flex>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>

      <Button
        onClick={() => handleTabChange("next")}
        className={classes.navigationButton}
        variant="default"
        p={0}
      >
        <CaretCircleRight
          weight="light"
          className={classes.fusionCaretCircleIcon}
        />
      </Button>
    </div>
  );
}

ModuleTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  badges: PropTypes.arrayOf(PropTypes.number),
};

export default ModuleTabs;
