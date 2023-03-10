<template>
  <div class="channel-edit">
    <van-cell slot="title" center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        size="mini"
        round
        plain
        style="width: 58px"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'close' : ''"
        v-for="(channels, index) in userChannels"
        :key="index"
        :text="channels.name"
        @click="onUserChannelClick(channels, index)"
      />
    </van-grid>
    <van-cell slot="title" center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(allChannels, index) in recommendChannels"
        :key="index"
        :text="allChannels.name"
        @click="addChannel(allChannels)"
      />
    </van-grid>
  </div>
</template>

<script>
import { addUserChannels, deleteUserChannels, getAllChannels } from "@/api";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";

export default {
	name : "ChannelEdit",
	props: {
		userChannels: {
			//类型
			type    : Array,
			//是否必传
			required: true
			//默认值
			// default: () => []
		},
		active: {
			type    : Number,
			required: true
		}
	},
	data() {
		return {
			//所有频道
			allChannels: [],
			//编辑状态
			isEdit     : false
		};
	},
	created() {
		this.loadAllChannels();
	},
	methods: {
		// 获取所有频道
		async loadAllChannels() {
			const { data } = await getAllChannels();
			console.log(data);
			this.allChannels = data.channels;
		},
		// 添加频道
		async addChannel(channel) {
			// eslint-disable-next-line vue/no-mutating-props
			this.userChannels.push(channel);
			//登录存到线上，未登录存到本地
			if (this.user) {
				//存到线上
				await addUserChannels({channels: [{ id: channel.id, seq: this.userChannels.length }]});
			}
			else {
				//存到本地
				setItem("userChannels", this.userChannels);
			}
		},
		onUserChannelClick(channels, index) {
			if (this.isEdit && index !== 0) {
				//删除频道
				this.deleteChannel(channels, index);
			}
			else {
				//切换频道
				this.switchChannel(index);
			}
		},
		// 删除频道
		async deleteChannel(channel, index) {
			// eslint-disable-next-line vue/no-mutating-props
			this.userChannels.splice(index, 1);
			//如果删除的是当前激活频道之前的频道
			if (index <= this.active) {
				//激活频道索引-1
				this.$emit("switchChannel", this.active - 1);
			}
			this.userChannels.slice(index, 1);
			//登录存到线上，未登录存到本地
			if (this.user) {
				//存到线上
				await deleteUserChannels(channel.id);
			}
			else {
				//存到本地
				setItem("userChannels", this.userChannels);
			}
		},
		//切换频道
		switchChannel(index) {
			//关闭弹出层，切换频道
			this.$emit("switchChannel", index);
			this.$emit("close");
		}
	},
	computed: {
		...mapState({ user: (state) => state.token.user }),
		// 推荐频道
		recommendChannels() {
			//1.先把我的频道的id取出来
			const myChannelsId = this.userChannels.map((item) => item.id);
			//2.过滤掉我的频道
			return this.allChannels.filter((item) => !myChannelsId.includes(item.id));
		}
	}
};
</script>

<style lang="scss" scoped>
.channel-edit {
  margin-top: 54px;
  
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  
  .grid-item {
    height: 43px;
    width: 80px;
    
    ::v-deep .van-grid-item__content {
      position: relative;
      
      .van-grid-item__icon {
        position: absolute;
        top: -5px;
        right: -6px;
        font-size: 18px;
        color: #d83b01;
      }
      
      background-color: #f4f5f6;
      
      .van-grid-item__text {
        font-size: 13px;
        margin-top: 0px;
        color: unset;
      }
    }
  }
  
  ::v-deep .active {
    color: #d83b01 !important;
  }
}
</style>
